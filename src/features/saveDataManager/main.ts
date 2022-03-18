import { game } from "../../cachedClasses";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { ModCallbacksCustom } from "../../enums/ModCallbacksCustom";
import { SaveDataKeys } from "../../enums/private/SaveDataKeys";
import { deepCopy, SerializationType } from "../../functions/deepCopy";
import { log } from "../../functions/log";
import { clearTable } from "../../functions/table";
import { SAVE_DATA_MANAGER_FEATURE_NAME } from "./constants";
import { loadFromDisk } from "./load";
import {
  saveDataConditionalFuncMap,
  saveDataDefaultsMap,
  saveDataMap,
} from "./maps";
import { saveToDisk } from "./save";

let mod: ModUpgraded | null = null;
let loadedDataOnThisRun = false;

/** @internal */
export function saveDataManagerInit(incomingMod: ModUpgraded): void {
  mod = incomingMod;

  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit); // 17
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  ); // 19
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit() {
  if (mod === null) {
    error(
      `The mod for the ${SAVE_DATA_MANAGER_FEATURE_NAME} was not initialized.`,
    );
  }

  if (loadedDataOnThisRun) {
    return;
  }
  loadedDataOnThisRun = true;

  // We want to unconditionally load save data on every new run since there might be persistent data
  // that is not tied to an individual run
  loadFromDisk(mod, saveDataMap);

  const gameFrameCount = game.GetFrameCount();
  const isContinued = gameFrameCount !== 0;
  if (!isContinued) {
    restoreDefaultsAll();
  }

  // On continued runs, the PostNewLevel callback will not fire, so we do not have to worry about
  // saved data based on level getting overwritten
}

// ModCallbacks.MC_PRE_GAME_EXIT (17)
function preGameExit() {
  if (mod === null) {
    error(
      `The mod for the ${SAVE_DATA_MANAGER_FEATURE_NAME} was not initialized.`,
    );
  }

  // We unconditionally save variables to disk
  // (because regardless of a save & quit or a death, persistent variables should be recorded)
  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);

  restoreDefaultsAll();
  loadedDataOnThisRun = false;
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevel() {
  restoreDefaults(SaveDataKeys.Level);
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  restoreDefaults(SaveDataKeys.Room);
}

function restoreDefaultsAll() {
  restoreDefaults(SaveDataKeys.Run);
  restoreDefaults(SaveDataKeys.Level);
  restoreDefaults(SaveDataKeys.Room);
}

function restoreDefaults(childTableName: SaveDataKeys) {
  if (
    childTableName !== SaveDataKeys.Run &&
    childTableName !== SaveDataKeys.Level &&
    childTableName !== SaveDataKeys.Room
  ) {
    error(`Unknown child table name of: ${childTableName}`);
  }

  log(`Resetting data for type: ${childTableName}`);

  for (const [subscriberName, saveData] of pairs(saveDataMap)) {
    const childTable = saveData[childTableName];
    if (childTable === undefined) {
      // This feature does not happen to store any variables on this particular child table
      continue;
    }

    // Get the default values for this feature
    const saveDataDefaults = saveDataDefaultsMap.get(subscriberName);
    if (saveDataDefaults === undefined) {
      error(
        `Failed to find the default copy of the save data for subscriber: ${subscriberName}`,
      );
    }

    // Get the default values for the specific sub-table of this feature
    const childTableDefaults = saveDataDefaults[childTableName];
    if (childTableDefaults === undefined) {
      error(
        `Failed to find the default copy of the child table "${childTableName}" for subscriber: ${subscriberName}`,
      );
    }

    // Make a new copy of the default child table
    const childTableDefaultsTable = childTableDefaults as unknown as LuaTable;
    const childTableDefaultsTableCopy = deepCopy(
      childTableDefaultsTable,
      SerializationType.NONE,
      `${subscriberName} --> ${childTableName}`,
    ) as LuaTable;

    // We do not want to blow away the existing child table because we don't want to break any
    // existing references
    // Instead, empty the table and copy all of the elements from the copy of the defaults table
    clearAndCopyAllElements(
      childTable as unknown as LuaTable,
      childTableDefaultsTableCopy,
    );
  }
}

/**
 * Will empty the old table of all elements, and then shallow copy all the elements from the new
 * table to the old table.
 */
function clearAndCopyAllElements(oldTable: LuaTable, newTable: LuaTable) {
  clearTable(oldTable);

  for (const [key, value] of pairs(newTable)) {
    oldTable.set(key, value);
  }
}

/** @internal */
export function forceSaveDataManagerSave(): void {
  if (mod === null) {
    return;
  }

  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
}

/** @internal */
export function forceSaveDataManagerLoad(): void {
  if (mod === null) {
    return;
  }

  loadFromDisk(mod, saveDataMap);
}
