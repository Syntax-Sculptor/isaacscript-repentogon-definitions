import type { BlendFactor } from "../../../enums/BlendFactor";
import type { BlendType } from "../../../enums/BlendType";

declare global {
  /**
   * This class determines how a `LayerState` should blend with the elements rendered behind it. You
   * can retrieve this class by calling the `LayerState.GetBlendMode` method:
   *
   * ```ts
   * const sprite = Sprite();
   * const layer = sprite.GetLayer(0);
   * const blendMode = layer.GetBlendMode();
   * ```
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface BlendMode extends IsaacAPIClass {
    SetMode: (blendType: BlendType) => void;

    AlphaDestinationFactor: BlendFactor;
    AlphaSourceFactor: BlendFactor;
    RGBDestinationFactor: BlendFactor;
    RGBSourceFactor: BlendFactor;
  }
}
