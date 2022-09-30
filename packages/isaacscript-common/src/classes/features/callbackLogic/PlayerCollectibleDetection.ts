import {
  ActiveSlot,
  CollectibleType,
  DamageFlag,
  EntityType,
  ModCallback,
  PlayerType,
} from "isaac-typescript-definitions";
import { arrayEquals } from "../../../functions/array";
import { getEnumValues } from "../../../functions/enums";
import { hasFlag } from "../../../functions/flag";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../../functions/playerDataStructures";
import {
  getPlayerCollectibleMap,
  getPlayerFromPtr,
} from "../../../functions/players";
import { repeat } from "../../../functions/utils";
import { PlayerIndex } from "../../../types/PlayerIndex";
import { PostPlayerCollectibleAdded } from "../../callbacks/PostPlayerCollectibleAdded";
import { PostPlayerCollectibleRemoved } from "../../callbacks/PostPlayerCollectibleRemoved";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";
import { RunInNFrames } from "../other/RunInNFrames";

export class PlayerCollectibleDetection extends Feature {
  public override v = {
    run: {
      playersCollectibleCount: new DefaultMap<PlayerIndex, int>(0),
      playersCollectibleMap: new DefaultMap<
        PlayerIndex,
        Map<CollectibleType, int>
      >(() => new Map()),
      playersActiveItemMap: new DefaultMap<
        PlayerIndex,
        Map<ActiveSlot, CollectibleType>
      >(() => new Map()),
    },
  };

  private postPlayerCollectibleAdded: PostPlayerCollectibleAdded;
  private postPlayerCollectibleRemoved: PostPlayerCollectibleRemoved;
  private runInNFrames: RunInNFrames;

  constructor(
    postPlayerCollectibleAdded: PostPlayerCollectibleAdded,
    postPlayerCollectibleRemoved: PostPlayerCollectibleRemoved,
    runInNFrames: RunInNFrames,
  ) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_USE_ITEM, [this.useItemD4, CollectibleType.D4]], // 3
      [ModCallback.POST_PEFFECT_UPDATE, [this.postPEffectUpdate]], // 4
      [
        ModCallback.ENTITY_TAKE_DMG,
        [this.entityTakeDmgPlayer, EntityType.PLAYER],
      ], // 11
    ];

    this.postPlayerCollectibleAdded = postPlayerCollectibleAdded;
    this.postPlayerCollectibleRemoved = postPlayerCollectibleRemoved;
    this.runInNFrames = runInNFrames;
  }

  /**
   * This is called when the collectible count changes and in situations where the entire build is
   * rerolled.
   *
   * Since getting a new player collectible map is expensive, we want to only run this function when
   * necessary, and not on e.g. every frame. Unfortunately, this has the side effect of missing out
   * on collectible changes from mods that add and remove a collectible on the same frame.
   *
   * @param player The player to update.
   * @param numCollectiblesChanged Pass undefined for situations where the entire build was
   *                               rerolled.
   */
  private updateCollectibleMapAndFire(
    player: EntityPlayer,
    numCollectiblesChanged: int | undefined,
  ) {
    const oldCollectibleMap = defaultMapGetPlayer(
      this.v.run.playersCollectibleMap,
      player,
    );
    const newCollectibleMap = getPlayerCollectibleMap(player);
    mapSetPlayer(this.v.run.playersCollectibleMap, player, newCollectibleMap);

    const collectibleTypesSet = new Set<CollectibleType>([
      ...oldCollectibleMap.keys(),
      ...newCollectibleMap.keys(),
    ]);

    let numFired = 0;
    for (const collectibleType of collectibleTypesSet.values()) {
      const oldNum = oldCollectibleMap.get(collectibleType) ?? 0;
      const newNum = newCollectibleMap.get(collectibleType) ?? 0;
      const difference = newNum - oldNum;
      const increased = difference > 0;
      const absoluteDifference = Math.abs(difference);

      repeat(absoluteDifference, () => {
        if (increased) {
          this.postPlayerCollectibleAdded.fire(player, collectibleType);
        } else {
          this.postPlayerCollectibleRemoved.fire(player, collectibleType);
        }
        numFired++;
      });

      if (numFired === numCollectiblesChanged) {
        return;
      }
    }
  }

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.D4 (284)
  private useItemD4 = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
  ): boolean | undefined => {
    // This function is also triggered for:
    // - D100
    // - D Infinity copying D4 or D100
    // - 1-pip dice room
    // - 6-pip dice room
    // - Reverse Wheel of Fortune copying 1-pip or 6-pip dice room
    // - First getting Missing No.
    // - Arriving on a new floor with Missing No.

    // This function is not triggered for:
    // - Tainted Eden getting hit (this is explicitly handled elsewhere)
    // - Genesis (which is automatically handled by the collectibles being removed in the normal
    //   `POST_PLAYER_COLLECTIBLE_REMOVED` callback)
    this.updateCollectibleMapAndFire(player, undefined);

    return undefined;
  };

  // ModCallback.POST_PEFFECT_UPDATE (4)
  private postPEffectUpdate = (player: EntityPlayer) => {
    const oldCollectibleCount = defaultMapGetPlayer(
      this.v.run.playersCollectibleCount,
      player,
    );
    const newCollectibleCount = player.GetCollectibleCount();
    mapSetPlayer(
      this.v.run.playersCollectibleCount,
      player,
      newCollectibleCount,
    );

    const difference = newCollectibleCount - oldCollectibleCount;

    if (difference > 0) {
      this.updateCollectibleMapAndFire(player, difference);
    } else if (difference < 0) {
      this.updateCollectibleMapAndFire(player, difference * -1);
    } else if (difference === 0) {
      this.checkActiveItemsChanged(player);
    }
  };

  /**
   * Checking for collectible count will work to detect when a player swaps their active item for
   * another active item. This is because the collectible count will decrement by 1 when the item is
   * swapped onto the pedestal and the hold animation begins, and increment by 1 when the item is
   * dequeued and the hold animation ends.
   *
   * However, we also want to explicitly check for the case where a mod swaps in a custom active
   * collectible on the same frame, since doing so is cheap.
   */
  private checkActiveItemsChanged(player: EntityPlayer) {
    const activeItemMap = defaultMapGetPlayer(
      this.v.run.playersActiveItemMap,
      player,
    );

    const oldCollectibleTypes: CollectibleType[] = [];
    const newCollectibleTypes: CollectibleType[] = [];

    for (const activeSlot of getEnumValues(ActiveSlot)) {
      const oldCollectibleType =
        activeItemMap.get(activeSlot) ?? CollectibleType.NULL;
      const newCollectibleType = player.GetActiveItem(activeSlot);
      activeItemMap.set(activeSlot, newCollectibleType);

      oldCollectibleTypes.push(oldCollectibleType);
      newCollectibleTypes.push(newCollectibleType);
    }

    // For example, it is possible for the player to switch Schoolbag items, which will cause the
    // collectibles in the array to be the same, but in a different order. Thus, we sort both arrays
    // before comparing them.
    oldCollectibleTypes.sort();
    newCollectibleTypes.sort();

    if (!arrayEquals(oldCollectibleTypes, newCollectibleTypes)) {
      // One or more active items have changed (with the player's total collectible count remaining
      // the same).
      this.updateCollectibleMapAndFire(player, undefined);
    }
  }

  // ModCallback.ENTITY_TAKE_DMG (11)
  // EntityType.PLAYER (1)
  // We need to handle the case of Tainted Eden taking damage.
  private entityTakeDmgPlayer = (
    entity: Entity,
    _amount: float,
    damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    // Tainted Eden's mechanic does not apply if she e.g. uses Dull Razor.
    if (hasFlag(damageFlags, DamageFlag.FAKE)) {
      return undefined;
    }

    const player = entity.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    const character = player.GetPlayerType();
    if (character !== PlayerType.EDEN_B) {
      return undefined;
    }

    // The items will only be rerolled after the damage is successfully applied.
    const entityPtr = EntityPtr(player);
    this.runInNFrames.runNextGameFrame(() => {
      const futurePlayer = getPlayerFromPtr(entityPtr);
      if (futurePlayer !== undefined) {
        this.updateCollectibleMapAndFire(player, undefined);
      }
    });

    return undefined;
  };
}
