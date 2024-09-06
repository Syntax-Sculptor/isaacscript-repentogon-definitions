/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * The BossPool class is used to handle the floor's pool of bosses. You can get this class by using
 * the `BossPoolManager.GetPool` method:
 *
 * ```ts
 * const basementBossPool = BossPoolManager.GetPool(StageID.BASEMENT);
 * ```
 *
 * @see https://repentogon.com/
 */
declare interface BossPool extends IsaacAPIClass {
  /** Returns the ID of one of the double trouble rooms in the boss pool. */
  GetDoubleTroubleRoomID: () => int;

  /**
   * Returns an array containing all of the bosses in the boss pool and their data such as weight
   * and tied achievement.
   */
  GetEntries: () => BossPoolEntry[];

  /** Returns the name of the boss pool. */
  GetName: () => string;

  /** Returns the RNG object of the boss pool. This is used for selecting which boss is chosen. */
  GetRNG: () => RNG;

  /** Returns the boss pool's weight. */
  GetWeight: () => number;
}
