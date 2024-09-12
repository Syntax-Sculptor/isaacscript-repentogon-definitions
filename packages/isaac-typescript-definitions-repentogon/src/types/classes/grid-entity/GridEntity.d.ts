import type { DamageFlag } from "isaac-typescript-definitions";

declare global {
  interface GridEntity extends IsaacAPIClass {
    /** Returns the grid's render position. */
    GetRenderPosition: () => Vector;

    HurtDamage: (
      entity: Entity,
      damage: int,
      damageFlags: DamageFlag | BitFlags<DamageFlag>,
      unknownNumber: number,
      unknownBool: boolean,
    ) => void;

    HurtSurroundings: (
      damage: int,
      damageFlags: DamageFlag | BitFlags<DamageFlag>,
      unknownNumber: number,
      unknownBool: boolean,
    ) => void;

    /** Returns whether the grid entity is a breakable rock. */
    IsBreakableRock: () => boolean;
  }
}
