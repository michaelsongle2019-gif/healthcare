import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { getDefaultAdminCredentials } from "@/lib/auth";
import { getDatabaseFilePath } from "@/lib/runtime-storage";
import { seedDemoContent } from "@/lib/seed";

let singleton: Database.Database | null = null;

const schema = `
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    manufacturer_zh TEXT NOT NULL DEFAULT '',
    manufacturer_en TEXT NOT NULL DEFAULT '',
    model TEXT NOT NULL DEFAULT '',
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    summary_zh TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    application_zh TEXT NOT NULL,
    application_en TEXT NOT NULL,
    specifications_zh TEXT NOT NULL,
    specifications_en TEXT NOT NULL,
    packaging_zh TEXT NOT NULL,
    packaging_en TEXT NOT NULL,
    image_url TEXT NOT NULL DEFAULT '',
    featured INTEGER NOT NULL DEFAULT 0,
    seo_title_zh TEXT NOT NULL,
    seo_title_en TEXT NOT NULL,
    seo_description_zh TEXT NOT NULL,
    seo_description_en TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    title_zh TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    access_level TEXT NOT NULL CHECK (access_level IN ('public', 'request')),
    file_path TEXT NOT NULL DEFAULT '',
    storage_path TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title_zh TEXT NOT NULL,
    title_en TEXT NOT NULL,
    summary_zh TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    content_zh TEXT NOT NULL,
    content_en TEXT NOT NULL,
    published_at TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS document_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id INTEGER NOT NULL,
    company TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

function ensureDirectory(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function ensureColumn(
  db: Database.Database,
  tableName: string,
  columnName: string,
  definition: string
) {
  const columns = db
    .prepare(`PRAGMA table_info(${tableName})`)
    .all() as Array<{ name: string }>;

  if (!columns.some((column) => column.name === columnName)) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
}

function upsertDefaultSettings(db: Database.Database) {
  const defaults = {
    companyNameZh: "康洛医疗",
    companyNameEn: "KANGLO MEDICAL",
    taglineZh: "国产医疗影像设备与介入耗材展示平台",
    taglineEn:
      "A bilingual presentation platform for authentic medical devices and consumables",
    addressZh: "中国上海张江高端医疗产业园 88 号",
    addressEn: "88 Advanced MedTech Park, Zhangjiang, Shanghai, China",
    phone: "+86 21 5555 8800",
    email: "bd@aurexismedical.example",
    heroTitleZh: "让国产高端医疗设备，被采购团队一眼看懂",
    heroTitleEn: "Professional Presentation of Authentic Medical Product Lines",
    heroBodyZh:
      "面向医院集团、经销渠道与国际项目采购，集中展示国产医疗影像设备、介入耗材及其配套资料。",
    heroBodyEn:
      "Designed for hospitals, channel partners, and project teams to review authentic product naming, public specifications, official references, and category-level device portfolios.",
    seoDescriptionZh:
      "康洛医疗展示国产医疗影像设备、介入耗材、官方资料入口与项目沟通能力。",
    seoDescriptionEn:
      "Professional bilingual presentation of authentic medical devices, consumables, official references, and product-ready technical information."
  };

  const statement = db.prepare(
    `
      INSERT INTO site_settings (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `
  );

  Object.entries(defaults).forEach(([key, value]) => {
    statement.run(key, value);
  });
}

export function createDatabase(filePath: string) {
  if (filePath !== ":memory:") {
    ensureDirectory(filePath);
  }

  return new Database(filePath);
}

export function initializeDatabase(db: Database.Database) {
  db.exec(schema);
  ensureColumn(db, "products", "manufacturer_zh", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(db, "products", "manufacturer_en", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(db, "products", "model", "TEXT NOT NULL DEFAULT ''");

  const adminCount = db.prepare("SELECT COUNT(*) as count FROM admins").get() as {
    count: number;
  };

  if (adminCount.count === 0) {
    const credentials = getDefaultAdminCredentials();
    db.prepare(
      `
        INSERT INTO admins (username, password_hash, display_name)
        VALUES (@username, @passwordHash, @displayName)
      `
    ).run(credentials);
  }

  upsertDefaultSettings(db);
}

export function getDatabase() {
  if (!singleton) {
    const databaseFile = getDatabaseFilePath();
    singleton = createDatabase(databaseFile);
    initializeDatabase(singleton);
    seedDemoContent(singleton);
  }

  return singleton;
}
