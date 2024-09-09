/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum BlendType {
  /**
   * Uses a fixed color for blending, ignoring any background colors.
   *
   * This is used by the flat blue
   * Planetarium backdrop layer and the flat color layers of the Hell backdrop.
   */
  CONSTANT = 0,

  /**
   * The default blending mode. Sprites blend with the background using standard alpha blending,
   * where the sprite's color and transparency mix with the background color.
   */
  NORMAL = 1,

  /**
   * Adds the sprite's color values to the background color values, brightening it.
   *
   * This is used by the starfield layer of the Planetarium backdrop, the shining light spawned
   * during The Beast's death, and more.
   */
  ADDITIVE = 2,

  /**
   * Multiplies the sprite's color values to the background color values, darkening it.
   *
   * This is used by the aura effect Cursed Death Heads have, the `lava_multiply` layer of the Hell
   * backdrop, and more.
   */
  MULTIPLICATIVE = 3,

  /**
   * Has the sprite render over the background while still preserving its colors. This is used by
   * the overlay layer in the Boss Intro versus sprite and the hush ashes effect.
   */
  OVERLAY = 4,
}
