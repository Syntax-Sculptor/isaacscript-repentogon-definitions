/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace Ambush {
  /** Returns the current wave of the ongoing ambush. */
  function GetCurrentWave(): int;

  /**
   * Returns the amount of waves that the boss rush has.
   *
   * The maximum amount of boss rush waves can be modified through the `Ambush.SetMaxBossrushWaves`
   * method.
   */
  function GetMaxBossrushWaves(): int;

  /**
   * Returns the maximum amount of challenge room waves.
   *
   * The maximum amount of challenge room waves can be modified through the
   * `Ambush.SetMaxChallengeWaves` method.
   */
  function GetMaxChallengeWaves(): int;

  /**
   * Returns the `RoomConfig` of the next Challenge Room wave to spawn.
   *
   * Calling this method outside of a Challenge Room will throw an error.
   */
  function GetNextWave(): RoomConfig;

  /** Returns an array containing the `RoomConfig` of the next Challenge Room waves. */
  function GetNextWaves(): ReadonlyArray<RoomConfig>;

  /** Sets the maximum amount of Boss Rush waves. This is currently capped at 25. */
  function SetMaxBossrushWaves(waves: int): void;

  /**
   * Sets the maximum amount of Challenge Room waves.
   *
   * This method is currently bugged as the maximum amount of challenge room waves is not reset
   * until the game restarts. You will need to manually reset it in the
   * `ModCallbackCustom.POST_GAME_STARTED_REORDERED` callback.
   *
   */
  function SetMaxChallengeWaves(waves: int): void;

  // SpawnBossrushWave is currently bugged to the point it can not really be utilized at all.

  /**
   * Spawns a Challenge Room wave associated with the current floor.
   *
   * This method is currently bugged as it can crash under the following circumstances:
   *  - The current floor does not have any challenge rooms.
   *    * The only floor that does not have any challenge rooms under normal circumstances is Blue
   *      Womb.
   *  - The current difficulty is either Greed or Greedier.
   */
  function SpawnWave(): void;

  /**
   * Starts the Challenge or Boss Rush if the player is in a Challenge Room or Boss Rush room
   * respectively.
   *
   * Calling this method outside of Challenge Rooms and Boss Rush rooms will permanently close the
   * doors and not spawn any waves, resulting in a softlock.
   */
  function StartChallenge(): void;
}
