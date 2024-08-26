import type {
  Dimension,
  DoorSlot,
  DoorSlotFlag,
} from "isaac-typescript-definitions";

declare global {
  interface RoomDescriptor extends IsaacAPIClass {
    AddRestrictedGridIndex: (gridIndex: int) => void;
    GetDimension: () => Dimension;
    GetEntitiesSaveState: () => EntitiesSaveStateVector;
    GetGridEntitiesSaveState: () => GridEntitiesSaveStateVector;
    GetNeighboringRooms: () => LuaTable<DoorSlot, RoomDescriptor>;
    GetRestrictedGridIndexes: () => int[];
    InitSeeds: (rng: RNG) => void;

    AllowedDoors: BitFlags<DoorSlotFlag>;
    Doors: BitFlags<DoorSlotFlag>;
  }
}
