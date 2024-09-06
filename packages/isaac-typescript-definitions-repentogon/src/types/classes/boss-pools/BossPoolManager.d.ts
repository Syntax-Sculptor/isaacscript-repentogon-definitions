import type { BossID, StageID } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   * @noSelf
   */
  namespace BossPoolManager {
    /** Returns a `BossPool` corresponding tro the provided `stageID`. */
    function GetPool(stageID: StageID): BossPool;

    /**
     * Returns a map that represents which bosses have been removed from the game's boss pool.
     *
     * Upon entering a new floor, a random boss is chosen from the floor's boss pool to serve as
     * the floor's boss and is added to this dictionary. The floor's bosses are added back to the
     * game's boss pool if the floor's boss pool is empty.
     *
     * Bosses that have been selected in The Void are not removed from the game's boss pool.
     *
     * This method does not account for bosses that the game forcefully spawns in if a certain
     * condition is met, such as the Horsemen or The Fallen. If you wish to see if these bosses have
     * been removed, use `BossPoolManager.GetRemovedSpecialBosses` instead.
     *
     * **Example**
     *
     * This snippet checks to see if Rainmaker has been removed from the boss pool.
     *
     * ```ts
     * const removedBosses = BossPoolManager.GetRemovedBosses();
     *
     * if (removedBosses.has(BossID.RAINMAKER)) {
     *  // Rainmaker has been removed from the boss pool.
     * }
     * else {
     *  // Rainmaker has not been removed from the boss pool.
     * }
     * ```
     */
    function GetRemovedBosses(): LuaMap<BossID, boolean>;

    /**
     * Returns a map that represents which special bosses have been removed from the game's boss
     * pool.
     *
     * A special boss is a boss that the game forcefully spawns in if a certain condition is met,
     * such as the Horsemen or The Fallen. If wish to check to see if a regular boss has been
     * removed from the boss pool, use the `BossPoolManager.GetRemovedBosses` method instead.
     *
     * Bosses that have been selected in The Void are not removed from the game's boss pool.
     *
     * A special boss is a boss that you can only encounter if a certain condition is met, such as
     * the Horsemen or The Fallen.
     *
     * **Example**
     *
     * This snippet checks to see if The Fallen has been removed from the boss pool.
     *
     * ```ts
     * const removedBosses = BossPoolManager.GetRemovedSpecialBosses();
     *
     * if (removedBosses.has(BossID.FALLEN)) {
     *  // The Fallen has been removed from the boss pool.
     * }
     * else {
     *  // The Fallen has not been removed from the boss pool.
     * }
     * ```
     */
    function GetRemovedSpecialBosses(): LuaMap<BossID, boolean>;
  }
}
