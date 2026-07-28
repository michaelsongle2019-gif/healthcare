import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const root = process.cwd();
const databaseFile = path.join(root, "data", "healthcare.db");
const jsonOutput = path.join(root, "data", "site-catalog.generated.json");
const tsOutput = path.join(root, "src", "lib", "site-catalog.generated.ts");

const db = new Database(databaseFile, { readonly: true });

const categories = db
  .prepare(
    `
      SELECT
        slug,
        name_zh AS nameZh,
        name_en AS nameEn,
        description_zh AS descriptionZh,
        description_en AS descriptionEn,
        sort_order AS sortOrder
      FROM categories
      ORDER BY sort_order ASC, id ASC
    `
  )
  .all();

const products = db
  .prepare(
    `
      SELECT
        p.slug,
        p.manufacturer_zh AS manufacturerZh,
        p.manufacturer_en AS manufacturerEn,
        p.model,
        p.name_zh AS nameZh,
        p.name_en AS nameEn,
        p.summary_zh AS summaryZh,
        p.summary_en AS summaryEn,
        p.application_zh AS applicationZh,
        p.application_en AS applicationEn,
        p.specifications_zh AS specificationsZh,
        p.specifications_en AS specificationsEn,
        p.packaging_zh AS packagingZh,
        p.packaging_en AS packagingEn,
        p.image_url AS imageUrl,
        p.featured,
        p.seo_title_zh AS seoTitleZh,
        p.seo_title_en AS seoTitleEn,
        p.seo_description_zh AS seoDescriptionZh,
        p.seo_description_en AS seoDescriptionEn,
        c.slug AS categorySlug,
        (
          SELECT d.file_path
          FROM documents d
          WHERE d.product_id = p.id
            AND d.access_level = 'public'
            AND d.file_path <> ''
          ORDER BY
            CASE WHEN d.storage_path LIKE 'official:%' THEN 0 ELSE 1 END,
            d.sort_order ASC,
            d.id ASC
          LIMIT 1
        ) AS sourceUrl
      FROM products p
      INNER JOIN categories c ON c.id = p.category_id
      ORDER BY p.featured DESC, p.id ASC
    `
  )
  .all()
  .map((product) => ({
    key: String(product.slug).replace(/[^a-zA-Z0-9]+/g, "_"),
    categorySlug: product.categorySlug,
    slug: product.slug,
    manufacturerZh: product.manufacturerZh,
    manufacturerEn: product.manufacturerEn,
    model: product.model,
    nameZh: product.nameZh,
    nameEn: product.nameEn,
    summaryZh: product.summaryZh,
    summaryEn: product.summaryEn,
    applicationZh: product.applicationZh,
    applicationEn: product.applicationEn,
    specificationsZh: product.specificationsZh,
    specificationsEn: product.specificationsEn,
    packagingZh: product.packagingZh,
    packagingEn: product.packagingEn,
    imageUrl: product.imageUrl,
    sourceUrl: product.sourceUrl || "",
    featured: product.featured,
    seoTitleZh: product.seoTitleZh,
    seoTitleEn: product.seoTitleEn,
    seoDescriptionZh: product.seoDescriptionZh,
    seoDescriptionEn: product.seoDescriptionEn
  }));

db.close();

const payload = { categories, products };

fs.writeFileSync(jsonOutput, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
fs.writeFileSync(
  tsOutput,
  `// This file is auto-generated from the runtime catalog snapshot.\n` +
    `export const realCategories = ${JSON.stringify(categories, null, 2)} as const;\n\n` +
    `export const realProducts = ${JSON.stringify(products, null, 2)} as const;\n`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      databaseFile,
      jsonOutput,
      tsOutput,
      categoryCount: categories.length,
      productCount: products.length
    },
    null,
    2
  )
);
