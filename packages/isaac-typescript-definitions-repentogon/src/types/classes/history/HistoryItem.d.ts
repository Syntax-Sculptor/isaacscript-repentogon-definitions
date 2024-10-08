import type {
  CollectibleType,
  ItemPoolType,
  LevelStage,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface HistoryItem extends IsaacAPIClass {
    /** Returns the `CollectibleType` this history item represents. */
    GetItemID: () => CollectibleType;

    /** Returns the `ItemPoolType` for which the history item was added. */
    GetItemPoolType: () => ItemPoolType;

    /** Returns the `LevelStage` where the history item was added. */
    GetLevelStage: () => LevelStage;

    /** Returns the `RoomType` where the history item was added. */
    GetRoomType: () => RoomType;

    /** Returns the `StageType` `StageType` where the history item was added. */
    GetStageType: () => StageType;

    /** Returns the time of when the history item was added. */
    GetTime: () => int;

    /** Returns whether the history item is a trinket. */
    IsTrinket: () => boolean;
  }
}
