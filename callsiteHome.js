import { fileURLToPath } from "url";
import { isAbsolute, dirname } from "path";

import { readPackageUp, readPackageUpSync } from "read-pkg-up";
import isScoped from "is-scoped";
import callsites from "callsites";

export function callsiteHomeSync(pathSegment) {
  const caller = getCaller();
  const TMP_PATH_SEGMENT = detectPathSegmentSync(caller, pathSegment);
  const gotCallsiteAppHome = caller.slice(
    0,
    caller.indexOf(TMP_PATH_SEGMENT) + TMP_PATH_SEGMENT.length
  );

  return gotCallsiteAppHome;
}

export async function callsiteHome(pathSegment) {
  const caller = getCaller();
  const TMP_PATH_SEGMENT = await detectPathSegment(caller, pathSegment);
  const gotCallsiteAppHome = caller.slice(
    0,
    caller.indexOf(TMP_PATH_SEGMENT) + TMP_PATH_SEGMENT.length
  );

  return gotCallsiteAppHome;
}

function getCaller() {
  const raw = callsites()[0].getFileName();
  const caller = !isAbsolute(raw) ? fileURLToPath(raw) : raw;

  return caller;
}

function detectPathSegmentSync(caller, pathSegment) {
  let tmpPathSegment = pathSegment;

  if (!tmpPathSegment || !caller.indexOf(tmpPathSegment)) {
    const closestPkg = readPackageUpSync({ cwd: dirname(caller) });
    tmpPathSegment = getName(closestPkg.packageJson.name);
  }

  return tmpPathSegment;
}

async function detectPathSegment(caller, pathSegment) {
  let tmpPathSegment = pathSegment;

  if (!tmpPathSegment || !caller.indexOf(tmpPathSegment)) {
    const closestPkg = await readPackageUp({ cwd: dirname(caller) });
    tmpPathSegment = getName(closestPkg.packageJson.name);
  }

  return tmpPathSegment;
}

function getName(pkgName) {
  return isScoped(pkgName) ? pkgName.split("/")[1] : pkgName;
}
