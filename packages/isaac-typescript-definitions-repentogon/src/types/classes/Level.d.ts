import type {
  Dimension,
  DoorSlot,
  LevelStage,
  RoomShape,
  StageType,
} from "isaac-typescript-definitions";
import type { SpecialQuest } from "../../enums/SpecialQuest";

declare global {
  interface Level extends IsaacAPIClass {
    /**
     * Returns whether the room can fit in the provided `gridIndex`.
     *
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     * @param allowMultipleDoors Optional. Determines if the room should be placed if it has multiple doors. Default is true.
     * @param allowSpecialNeighbors Optional. Determines if the room can have connections to special rooms. Secret rooms are always allowed, but boss rooms are never allowed. Default is false.
     * @param allowNoNeighbors Optional. Determines if the room can be placed without having any neighbors. Default is false.
     */
    CanPlaceRoom: (
      roomConfig: RoomConfig,
      gridIndex: int,
      dimension?: Dimension,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
      allowNoNeighbors?: boolean,
    ) => boolean;

    /**
     * Returns whether the room can be placed at the provided `doorSlot`.
     *
     * @param roomConfig
     * @param roomDescriptor
     * @param doorSlot
     * @param allowMultipleDoors Optional. Determines if the room should be placed if it has multiple doors. Default is true.
     * @param allowSpecialNeighbors Optional. Determines if the room can have connections to special rooms. Secret rooms are always allowed, but boss rooms are never allowed. Default is false.
     */
    CanPlaceRoomAtDoor: (
      roomConfig: RoomConfig,
      roomDescriptor: RoomDescriptor,
      doorSlot: DoorSlot,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
    ) => boolean;

    /** Returns whether the Red Door outline can spawn at the specified `DoorSlot`. */
    CanSpawnDoorOutline: (roomIndex: int, doorSlot: DoorSlot) => boolean;

    /**
     * Returns an array of grid indexes which are valid locations to place the given room.
     *
     * @param roomConfig
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     * @param allowMultipleDoors Optional. Determines if the room should be placed if it has multiple doors. Default is true.
     * @param allowSpecialNeighbors Optional. Determines if the room can have connections to special rooms. Secret rooms are always allowed, but boss rooms are never allowed. Default is false.
     */
    FindValidRoomPlacementLocations: (
      roomConfig: RoomConfig,
      dimension?: Dimension,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
    ) => ReadonlyArray<int>;

    /** Returns the current dimension the player is in. */
    GetDimension: () => Dimension;

    /**
     * Returns the pickups that will be transferred to the next floor by the Myosotis trinket
     * effect.
     */
    GetMyosotisPickups: () => EntitiesSaveStateVector;

    /**
     * Returns a dictionary containing neighboring rooms from the provided `gridIndex`. This can be used to determine the neighbors of a room before placing it.
     *
     * This method does not signal if a room would actually fit or if the neighbors would allow a connection.
     *
     * @param gridIndex
     * @param roomShape
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     */
    GetNeighboringRooms: (
      gridIndex: int,
      roomShape: RoomShape,
      dimension?: Dimension,
    ) => LuaTable<DoorSlot, RoomDescriptor>;

    /** Returns whether the special quest is forced. */
    GetForceSpecialQuest: () => SpecialQuest;

    GetGreedWavesClearedWithoutRedHeartDamage: () => int;

    /** Returns whether the floor has the mineshaft room used for the second Knife Piece puzzle. */
    HasAbandonedMineshaft: () => boolean;

    /** Returns whether the floor has the mirror dimension used for the first Knife Piece puzzle. */
    HasMirrorDimension: () => boolean;

    /**
     * Returns whether the floor has the mysterious door used to enter Mausoleum/Gehenna leading to
     * the Ascent sequence.
     */
    HasPhotoDoor: () => boolean;

    /**
     * Returns whether the specified level and stage combination can be generated in any given run
     * and is not locked behind an achievement.
     */
    IsStageAvailable: (level: LevelStage, stage: StageType) => void;

    /**
     * Attempts to place a room.
     *
     * Returns whether room placement was successful.
     */
    PlaceRoom: (
      room: LevelGeneratorEntry,
      roomConfig: RoomConfig,
      seed: Seed,
    ) => boolean;

    SetGreedWavesClearedWithoutRedHeartDamage: (waves: int) => void;
    SetForceSpecialQuest: (quest: SpecialQuest) => void;

    /** Sets the display name of the level. */
    SetName: (name: string) => void;

    /**
     * Attempts to place a room on the grid. If the room is placed successfully, its `RoomDescriptor` is returned. Returns undefined if the room was not placed successfully.
     *
     * @param roomConfig
     * @param gridIndex
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     * @param seed Optional. If undefined or set to 0, the seed will be set based on the location, room shape, and level seed. Default is undefined.
     * @param allowMultipleDoors Optional. Determines if the room should be placed if it has multiple doors. Default is true.
     * @param allowSpecialNeighbors Optional. Determines if the room can have connections to special rooms. Secret rooms are always allowed, but boss rooms are never allowed. Default is false.
     * @param allowNoNeighbors Optional. Determines if the room can be placed without having any neighbors. Default is false.
     */
    TryPlaceRoom: (
      roomConfig: RoomConfig,
      gridIndex: int,
      dimension?: Dimension,
      seed?: Seed,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
      allowNoNeighbors?: boolean,
    ) => RoomDescriptor | undefined;

    /**
     * Tries to place a room at the provided `doorSlot`.
     *
     * @param roomConfig
     * @param roomDescriptor
     * @param doorSlot
     * @param seed Optional. If undefined or set to 0, the seed will be set based on the location, room shape, and level seed. Default is undefined.
     * @param allowMultipleDoors Optional. Determines if the room should be placed if it has multiple doors. Default is true.
     * @param allowSpecialNeighbors Optional. Determines if the room can have connections to special rooms. Secret rooms are always allowed, but boss rooms are never allowed. Default is false.
     */
    TryPlaceRoomAtDoor: (
      roomConfig: RoomConfig,
      roomDescriptor: RoomDescriptor,
      doorSlot: DoorSlot,
      seed?: Seed,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
    ) => boolean;
  }
}
