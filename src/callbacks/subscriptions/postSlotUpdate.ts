export type PostSlotUpdateCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotUpdateCallbackType, SlotVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostSlotUpdateCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

export function fire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
