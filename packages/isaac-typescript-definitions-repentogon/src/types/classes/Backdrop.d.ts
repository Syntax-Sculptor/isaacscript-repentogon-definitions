/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface Backdrop extends IsaacAPIClass {
  /**
   * Returns the player controls sprite present in the starting room of the first floor.
   */
  GetControlsANM2: () => Sprite;

  /**
   * TODO: Document me!
   */
  GetControlsButtonsANM2: () => Sprite;

  /**
   * Returns the backdrop details sprite.
   */
  GetDetailANM2: () => Sprite;

  /**
   * Returns the floor sprite.
   */
  GetFloorANM2: () => Sprite;

  // `GetFloorImage` and `GetWallImage` is not included as the `Image` class currently does not have
  // any methods.
}
