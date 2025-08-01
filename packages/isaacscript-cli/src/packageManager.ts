import chalk from "chalk";
import {
  PackageManager,
  commandExists,
  fatalError,
  getPackageManagerLockFileName,
  getPackageManagersForProject,
} from "complete-node";
import { CWD } from "./constants.js";

export const PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT = PackageManager.npm;

interface PackageManagerOptions {
  npm: boolean;
  yarn: boolean;
  pnpm: boolean;
  dev?: boolean;
}

export async function getPackageManagerUsedForNewProject(
  options: PackageManagerOptions,
): Promise<PackageManager> {
  const packageManagerFromOptions = await getPackageManagerFromOptions(options);
  if (packageManagerFromOptions !== undefined) {
    return packageManagerFromOptions;
  }

  return getDefaultPackageManager();
}

/**
 * Previously, this function determined the package manager based on certain commands existing.
 * However, this is undesirable because some projects might prefer `npm`, even if they are forced to
 * use other package managers for other projects.
 */
function getDefaultPackageManager(): PackageManager {
  return PackageManager.npm;
}

export async function getPackageManagerUsedForExistingProject(): Promise<PackageManager> {
  const packageManagers = await getPackageManagersForProject(CWD);
  if (packageManagers.length > 1) {
    const packageManagerLockFileNames = packageManagers
      .map((packageManager) => getPackageManagerLockFileName(packageManager))
      .map((packageManagerLockFileName) => `"${packageManagerLockFileName}"`)
      .join(" & ");
    fatalError(
      `Multiple different kinds of package manager lock files were found (${packageManagerLockFileNames}). You should delete the ones that you are not using so that this program can correctly detect your package manager.`,
    );
  }

  const packageManager = packageManagers[0];
  if (packageManager !== undefined) {
    return packageManager;
  }

  return getDefaultPackageManager();
}

async function getPackageManagerFromOptions(options: PackageManagerOptions) {
  if (options.dev === true) {
    const packageManagerCommandExists = await commandExists(
      PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
    );
    if (!packageManagerCommandExists) {
      fatalError(
        `You specified the "--dev" option, but "${chalk.green(
          PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
        )}" does not seem to be a valid command. The IsaacScript monorepo uses ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT}, so in order to initiate a linked development mod, you must also have ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT} installed. Try running "corepack enable" to install it.`,
      );
    }

    return PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT;
  }

  if (options.npm) {
    const npmExists = await commandExists("npm");
    if (!npmExists) {
      fatalError(
        `You specified the "--npm" option, but "${chalk.green(
          "npm",
        )}" does not seem to be a valid command.`,
      );
    }

    return PackageManager.npm;
  }

  if (options.yarn) {
    const yarnExists = await commandExists("yarn");
    if (!yarnExists) {
      fatalError(
        `You specified the "--yarn" option, but "${chalk.green(
          "yarn",
        )}" does not seem to be a valid command.`,
      );
    }

    return PackageManager.yarn;
  }

  if (options.pnpm) {
    const pnpmExists = await commandExists("pnpm");
    if (!pnpmExists) {
      fatalError(
        `You specified the "--pnpm" option, but "${chalk.green(
          "pnpm",
        )}" does not seem to be a valid command.`,
      );
    }

    return PackageManager.pnpm;
  }

  return undefined;
}
