/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * The Ambush class is used to handle Challenge Rooms and Boss Rushes.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace Ambush {
  /** Returns the current wave for the ongoing ambush. */
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
  function GetNextWaves(): RoomConfig[];

  /** Sets the maximum amount of Boss Rush waves. This is currently capped at 25. */
  function SetMaxBossrushWaves(waves: int): void;

  /**
   * Sets the maximum amount of Challenge Room waves. The new amount of waves will persist across
   * runs until the game restarts.
   */
  function SetMaxChallengeWaves(waves: int): void;

  // SpawnBossrushWave is currently bugged to the point it can not really be utilized at all.

  /**
   * Spawns a Challenge Room wave associated with the current floor.
   *
   * Calling this method will result in a crash if:
   *  - The current floor's stb file doesn't have any rooms associated with Challenge Rooms. Under
   *    normal circumstances, the only floor to have no Challenge Rooms is Blue Womb.
   *  - The current difficulty is either Greed or Greedier.
   */
  function SpawnWave(): void;

  /**
   * Begins the ambush if the player is in a Challenge Room or Boss Rush room respectively. Does
   * nothing if the ambush waves have already been cleared.
   *
   * Calling this method outside of these rooms will permanently close the doors and not spawn any
   * waves, resulting in a softlock. To work around this, you can check to see if the player is in a
   * Challenge Room or Boss Rush room by using Isaacscript Common's `getAmbushType()` function.
   */
  function StartChallenge(): void;
}
