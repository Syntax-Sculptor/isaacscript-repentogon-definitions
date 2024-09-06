/**
 * The `RoomConfigSet` class is used to hold a floor's set of rooms. Each floor has two set of
 * rooms for each game mode, one for Normal Mode and one for Greed Mode.
 *
 * You can get this class by using the `RoomConfigState.GetRoomSet` method:
 *
 * ```ts
 * const basementConfig = RoomConfig.GetStage(StbType.BASEMENT);
 * const greedRoomSet = basementConfig.GetRoomSet(RoomConfigSetMode.GREED);
 * ```
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface RoomConfigSet extends IsaacAPIClass {
  /**
   * Returns a `RoomConfig` from the provided index. Returns undefined if no room at the index was
   * found.
   */
  Get: (index: int) => RoomConfig | undefined;

  /** The number of rooms in set. */
  readonly Size: int;

  // The underscore methods like `__add` are not implemented in favor of having `add` and so on.
  // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types

  len: LuaLengthMethod<int>;
}
