import os from "node:os";
import path from "node:path";

function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

export function getWritableRoot() {
  if (isVercelRuntime()) {
    return path.join(os.tmpdir(), "healthcare");
  }

  return path.join(process.cwd(), "data");
}

export function getDatabaseFilePath() {
  return process.env.DATABASE_FILE ?? path.join(getWritableRoot(), "healthcare.db");
}

export function getProtectedUploadDirectory() {
  return path.join(getWritableRoot(), "protected");
}

export function isEphemeralHosting() {
  return isVercelRuntime();
}
