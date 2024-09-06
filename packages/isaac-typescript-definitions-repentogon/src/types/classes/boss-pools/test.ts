import { BossID } from "isaac-typescript-definitions";

const removedBosses = BossPoolManager.GetRemovedBosses();

if (removedBosses.has(BossID.RAINMAKER)) {
  // Monstro hasn't been removed from the boss pool.
} else {
  // Monstro has been removed from the boss pool.
}
