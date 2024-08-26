declare global {
  interface ItemConfigCard extends IsaacAPIClass {
    /**
     * Clears the card's availability condition.
     */
    ClearAvailabilityCondition: () => void;

    /**
     * Returns the card's availability condition function. Returns undefined if no availability condition has been set.
     */
    GetAvailabilityCondition: () => () => boolean;

    /**
     * Sets the card's availability condition. If there is an already existing availability condition, it will be replaced.
     *
     * The game uses the provided `condition` function to check if the card is available or not.
     */
    SetAvailabilityCondition: (condition: () => boolean) => void;

    /**
     * Corresponds to the "hidden" value in "pocketitems.xml".
     */
    readonly Hidden: boolean;

    /**
     * Corresponds to the "initialWeight" value in "pocketitems.xml".
     */
    readonly InitialWeight: number;

    /**
     * Corresponds to the "weight" value in "pocketitems.xml".
     */
    Weight: number;
  }
}
