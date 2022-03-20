/**
 * CollectibleIndex is a specific type of string; see the documentation for the
 * [[`getCollectibleIndex`]] function. Mods can signify that data structures handle collectibles by
 * using this type.
 *
 * Example:
 * ```
 * const collectiblesNameMap = new Map<CollectibleIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type CollectibleIndex = string & { __collectibleIndexBrand: unknown };
