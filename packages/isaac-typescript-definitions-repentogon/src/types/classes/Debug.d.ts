/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace Debug {
  /** Forcibly unloads the specified file from the Lua environment. */
  function ForceUnload(moduleName: string): void;

  /**
   * Retrieves the function signature from the provided memory address.
   *
   * Passing an invalid address will result in an error. It's recommended to handle this method in a
   * pcall as if no signature was found or the memory address was invalid, an error will be thrown.
   */
  function GetSignature(address: int): string;

  /** Returns an array of all file names currently loaded in the Lua environment. */
  function ListLoadedFiles(): string[];
}
