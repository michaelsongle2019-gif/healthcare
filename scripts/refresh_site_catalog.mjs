import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const root = process.cwd();
const databaseFile = path.join(root, "data", "healthcare.db");
const catalogFile = path.join(root, "data", "site-catalog.generated.json");

if (!fs.existsSync(catalogFile)) {
  throw new Error(`Catalog file not found: ${catalogFile}`);
}

const { categories, products } = JSON.parse(fs.readFileSync(catalogFile, "utf8"));
const db = new Database(databaseFile);

db.pragma("foreign_keys = ON");

const deleteTables = [
  "document_requests",
  "documents",
  "news",
  "products",
  "categories"
];

for (const table of deleteTables) {
  db.prepare(`DELETE FROM ${table}`).run();
}

const insertCategory = db.prepare(`
  INSERT INTO categories (slug, name_zh, name_en, description_zh, description_en, sort_order)
  VALUES (@slug, @nameZh, @nameEn, @descriptionZh, @descriptionEn, @sortOrder)
`);

const insertProduct = db.prepare(`
  INSERT INTO products (
    category_id, slug, manufacturer_zh, manufacturer_en, model, name_zh, name_en,
    summary_zh, summary_en, application_zh, application_en, specifications_zh, specifications_en,
    packaging_zh, packaging_en, image_url, featured, seo_title_zh, seo_title_en,
    seo_description_zh, seo_description_en
  )
  VALUES (
    @categoryId, @slug, @manufacturerZh, @manufacturerEn, @model, @nameZh, @nameEn,
    @summaryZh, @summaryEn, @applicationZh, @applicationEn, @specificationsZh, @specificationsEn,
    @packagingZh, @packagingEn, @imageUrl, @featured, @seoTitleZh, @seoTitleEn,
    @seoDescriptionZh, @seoDescriptionEn
  )
`);

const insertDocument = db.prepare(`
  INSERT INTO documents (
    product_id, title_zh, title_en, description_zh, description_en,
    access_level, file_path, storage_path, sort_order
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const categoryIds = new Map();
for (const category of categories) {
  const result = insertCategory.run(category);
  categoryIds.set(category.slug, Number(result.lastInsertRowid));
}

let sortOrder = 1;
for (const product of products) {
  const categoryId = categoryIds.get(product.categorySlug);
  const result = insertProduct.run({
    ...product,
    categoryId
  });
  const productId = Number(result.lastInsertRowid);

  insertDocument.run(
    productId,
    `${product.nameZh} 官方来源`,
    `${product.nameEn || product.model} Official Source`,
    "用于核对官网来源、公开规格和监管信息。",
    "Used to review official source pages, public specifications, and regulatory references.",
    "public",
    product.sourceUrl || "",
    `official:${product.key}`,
    sortOrder
  );

  sortOrder += 1;
}

db.close();

console.log(
  JSON.stringify(
    {
      databaseFile,
      categoryCount: categories.length,
      productCount: products.length,
      documentCount: products.length
    },
    null,
    2
  )
);
