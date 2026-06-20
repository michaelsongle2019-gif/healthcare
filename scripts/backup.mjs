import fs from "node:fs";
import path from "node:path";

const databaseFile =
  process.env.DATABASE_FILE || path.join(process.cwd(), "data", "healthcare.db");
const backupDirectory = path.join(process.cwd(), "data", "backups");
fs.mkdirSync(backupDirectory, { recursive: true });

const backupFile = path.join(
  backupDirectory,
  `healthcare-backup-${Date.now()}.db`
);

fs.copyFileSync(databaseFile, backupFile);
console.log(`Backup created: ${backupFile}`);
