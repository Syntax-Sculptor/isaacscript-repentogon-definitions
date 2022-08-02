import {
  Card,
  CollectibleType,
  LevelStage,
  PillColor,
  PillEffect,
  PlayerType,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { getEnumLength, getLastEnumValue } from "../functions/enums";
import {
  asCard,
  asCollectibleType,
  asNumber,
  asPillEffect,
  asPlayerType,
  asTrinketType,
} from "../functions/types";
import { itemConfig } from "./cachedClasses";

// ------------
// Collectibles
// ------------

/** Equal to `CollectibleType.SAD_ONION`. */
export const FIRST_COLLECTIBLE_TYPE = CollectibleType.SAD_ONION;

/**
 * Will change depending on how many modded collectibles there are.
 *
 * Equal to `itemConfig.GetCollectibles().Size - 1`. (`Size` includes invalid collectibles, like
 * 666. We subtract one to account for `CollectibleType.NULL`.)
 */
export const LAST_COLLECTIBLE_TYPE = asCollectibleType(
  itemConfig.GetCollectibles().Size - 1,
);

/**
 * Calculated from the `CollectibleType` enum.
 *
 * Note that this cannot be calculated from the length of the enum, because unlike all of the other
 * enums, collectible types are not contiguous.
 */
export const LAST_VANILLA_COLLECTIBLE_TYPE = getLastEnumValue(CollectibleType);

/**
 * If there are no modded collectibles, this constant will represent a collectible type that does
 * not exist.
 */
export const FIRST_MODDED_COLLECTIBLE_TYPE = asCollectibleType(
  asNumber(LAST_VANILLA_COLLECTIBLE_TYPE) + 1,
);

/** Calculated from the `CollectibleType` enum. `CollectibleType.NULL` is not included. */
export const NUM_VANILLA_COLLECTIBLE_TYPES = getEnumLength(CollectibleType) - 1;

/** Unlike vanilla collectible types, modded collectible types are always contiguous. */
export const NUM_MODDED_COLLECTIBLE_TYPES =
  LAST_COLLECTIBLE_TYPE - LAST_VANILLA_COLLECTIBLE_TYPE;

export const NUM_COLLECTIBLE_TYPES =
  NUM_VANILLA_COLLECTIBLE_TYPES + NUM_MODDED_COLLECTIBLE_TYPES;

// --------
// Trinkets
// --------

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetTrinkets().Size - 1`. (We subtract one to account for
 * `TrinketType.NULL`.)
 */
export const NUM_TRINKET_TYPES = itemConfig.GetTrinkets().Size - 1;

/** Calculated from the `TrinketType` enum. `TrinketType.NULL` is not included. */
export const NUM_VANILLA_TRINKET_TYPES = getEnumLength(TrinketType) - 1;

export const NUM_MODDED_TRINKET_TYPES =
  NUM_TRINKET_TYPES - NUM_VANILLA_TRINKET_TYPES;

/** Equal to `TrinketType.SWALLOWED_PENNY`. */
export const FIRST_TRINKET_TYPE = TrinketType.SWALLOWED_PENNY;

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetTrinkets().Size - 1`. (We subtract one to account for
 * `TrinketType.NULL`.)
 */
export const LAST_TRINKET_TYPE = asTrinketType(NUM_TRINKET_TYPES);

/** Calculated from the `TrinketType` enum. */
export const LAST_VANILLA_TRINKET_TYPE = getLastEnumValue(TrinketType);

/**
 * If there are no modded trinkets, this constant will represent a trinket type that does not exist.
 */
export const FIRST_MODDED_TRINKET_TYPE = asTrinketType(
  asNumber(LAST_VANILLA_TRINKET_TYPE) + 1,
);

// -----
// Cards
// -----

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetCards().Size - 1`. (We subtract one to account for `Card.NULL`.)
 */
export const NUM_CARDS = itemConfig.GetCards().Size - 1;

/** Calculated from the `Card` enum. `Card.NULL` is not included. */
export const NUM_VANILLA_CARDS = getEnumLength(Card) - 1;

export const NUM_MODDED_CARDS = NUM_CARDS - NUM_VANILLA_CARDS;

/** Equal to `Card.FOOL`. */
export const FIRST_CARD = Card.FOOL;

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetCards().Size - 1`. (We subtract one to account for `Card.NULL`.)
 */
export const LAST_CARD = asCard(NUM_CARDS);

/** Calculated from the `Card` enum. */
export const MAX_VANILLA_CARD = getLastEnumValue(Card);

/** If there are no modded cards, this constant will represent a card that does not exist. */
export const FIRST_MODDED_CARD = asCard(asNumber(MAX_VANILLA_CARD) + 1);

// ------------
// Pill Effects
// ------------

/**
 * Will change depending on how many modded pill effects there are.
 *
 * Equal to `itemConfig.GetPillEffects().Size - 1`. (We subtract one to account for
 * `PillEffect.NULL`.)
 */
export const NUM_PILL_EFFECTS = itemConfig.GetPillEffects().Size - 1;

/**
 * Calculated from the `PillEffect` enum.
 *
 * (There is no `PillEffect.NULL` in the custom enum, so we don't have to subtract one here.)
 */
export const NUM_VANILLA_PILL_EFFECTS = getEnumLength(PillEffect);

export const NUM_MODDED_PILL_EFFECTS =
  NUM_PILL_EFFECTS - NUM_VANILLA_PILL_EFFECTS;

/** Equal to `PillEffect.BAD_GAS`. */
export const FIRST_PILL_EFFECT = PillEffect.BAD_GAS;

/**
 * Will change depending on how many modded pill effects there are.
 *
 * Equal to `itemConfig.GetPillEffects().Size - 1`. (We subtract one to account for
 * `PillEffect.NULL`.)
 */
export const LAST_PILL_EFFECT = asPillEffect(NUM_PILL_EFFECTS);

/** Calculated from the `PillEffect` enum. */
export const LAST_VANILLA_PILL_EFFECT = getLastEnumValue(PillEffect);

/**
 * If there are no modded pill effects, this constant will represent a pill effect that does not
 * exist.
 */
export const FIRST_MODDED_PILL_EFFECT = asPillEffect(
  asNumber(LAST_VANILLA_PILL_EFFECT) + 1,
);

// -----------
// Pill Colors
// -----------

/** Equal to `PillColor.BLUE_BLUE`. */
export const FIRST_PILL_COLOR = PillColor.BLUE_BLUE;

/**
 * Equal to `PillColor.WHITE_YELLOW`.
 *
 * Note that `PillColor.GOLD` is technically higher, but that is not considered for the purposes of
 * this constant.
 */
export const LAST_NORMAL_PILL_COLOR = PillColor.WHITE_YELLOW;

/** Equal to `PillColor.HORSE_BLUE_BLUE`. */
export const FIRST_HORSE_PILL_COLOR = PillColor.HORSE_BLUE_BLUE;

/**
 * Equal to `PillColor.HORSE_WHITE_YELLOW`.
 *
 * Note that `PillColor.HORSE_GOLD` is technically higher, but that is not considered for the
 * purposes of this constant.
 */
export const LAST_HORSE_PILL_COLOR = PillColor.HORSE_WHITE_YELLOW;

export const NUM_NORMAL_PILL_COLORS = LAST_NORMAL_PILL_COLOR - FIRST_PILL_COLOR;

// -------
// Players
// -------

/** Equal to `PlayerType.ISAAC`. */
export const FIRST_CHARACTER = PlayerType.ISAAC;

// It is not possible to determine "LAST_PLAYER_TYPE", since there is no associated config.

/** Calculated from the `PlayerType` enum. */
export const LAST_VANILLA_CHARACTER = getLastEnumValue(PlayerType);

/**
 * If there are no modded characters, this constant will represent a character that does not exist.
 * (There is no way to determine the amount of modded characters at run-time, since there is no
 * exposed player config.)
 */
export const FIRST_MODDED_CHARACTER = asPlayerType(
  asNumber(LAST_VANILLA_CHARACTER) + 1,
);

// ----------
// Room Types
// ----------

export const FIRST_ROOM_TYPE = RoomType.DEFAULT;
export const LAST_ROOM_TYPE = getLastEnumValue(RoomType);

// ------
// Stages
// ------

export const FIRST_STAGE = LevelStage.BASEMENT_1;
export const LAST_STAGE = getLastEnumValue(LevelStage);
