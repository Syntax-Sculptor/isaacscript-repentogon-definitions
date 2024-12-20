/**
 * Constructs a new Point object.
 *
 * @param this
 * @param position
 * @param spritesheetCoordinate The vertical position of the spritesheet that should be drawn by the
 *                              time the point is reached. For example, two points with a
 *                              `spritesheetCoordinate` of 0 and 64 will render the spritesheet
 *                              starting from `y = 0` to `y = 64`, while an additional third point
 *                              of 0 will draw it in reverse from `y = 64` to `y = 0`.
 * @param widthMultiplier Optional. A multiplier for how wide the beam should be. This is
 *                        interpolated between points. Default is 1.
 * @param color Optional. Default is `ColorDefault`.
 * @param isWorldSpace Optional. Default is false.
 */
declare function Point(
  this: void,
  position: Vector,
  spritesheetCoordinate: number,
  widthMultiplier?: number,
  color?: Color,
  isWorldSpace?: boolean,
): Point;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface Point extends IsaacAPIClass {
  /** Returns the point's color. */
  GetColor: () => Color;

  /**
   * Returns whether the game automatically converts the point's position from world space to screen
   * space when rendering.
   */
  GetIsWorldSpace: () => boolean;

  /** Returns the vertical position of the point. */
  GetSpritesheetCoordinate: () => number;

  /** Returns the width multiplier of the point. */
  GetWidth: () => number;

  /** Returns the position of the point. */
  GetPosition: () => Vector;

  /** Sets the point's color. */
  SetColor: (color: Color) => void;

  /**
   * Sets whether the game automatically converts the point's position from world space to screen
   * space when rendering.
   */
  SetIsWorldSpace: (isWorldSpace: boolean) => void;

  /** Sets the vertical position of the point. */
  SetSpritesheetCoordinate: (height: number) => void;

  /** Sets the width multiplier of the point. */
  SetWidth: (width: number) => void;

  /** Sets the position of the point. */
  SetPosition: (position: Vector) => void;
}
