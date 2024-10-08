/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface Shape extends IsaacAPIClass {
  GetTimeout: () => int;

  SetTimeout: (timeout: int) => void;

  /** Assigns a capsule collider to the shape. */
  Capsule: (capsule: Capsule) => void;
}
