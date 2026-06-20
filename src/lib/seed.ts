import type Database from "better-sqlite3";
import { realCategories, realProducts } from "@/lib/site-catalog.generated";

type CategorySeed = {
  slug: string;
  nameZh: string;
  nameEn: string;
  descriptionZh: string;
  descriptionEn: string;
  sortOrder: number;
};

type ProductSeed = {
  key: string;
  categorySlug: string;
  slug: string;
  manufacturerZh: string;
  manufacturerEn: string;
  model: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  applicationZh: string;
  applicationEn: string;
  specificationsZh: string;
  specificationsEn: string;
  packagingZh: string;
  packagingEn: string;
  imageUrl: string;
  sourceUrl: string;
  featured: number;
  seoTitleZh: string;
  seoTitleEn: string;
  seoDescriptionZh: string;
  seoDescriptionEn: string;
  documentAccess?: "public" | "request";
};

function upsertCategory(db: Database.Database, input: CategorySeed) {
  db.prepare(
    `
      INSERT INTO categories (slug, name_zh, name_en, description_zh, description_en, sort_order)
      VALUES (@slug, @nameZh, @nameEn, @descriptionZh, @descriptionEn, @sortOrder)
      ON CONFLICT(slug) DO UPDATE SET
        name_zh = excluded.name_zh,
        name_en = excluded.name_en,
        description_zh = excluded.description_zh,
        description_en = excluded.description_en,
        sort_order = excluded.sort_order
    `
  ).run(input);

  return (
    db.prepare("SELECT id FROM categories WHERE slug = ?").get(input.slug) as {
      id: number;
    }
  ).id;
}

function upsertProduct(
  db: Database.Database,
  input: {
    categoryId: number;
    slug: string;
    manufacturerZh: string;
    manufacturerEn: string;
    model: string;
    nameZh: string;
    nameEn: string;
    summaryZh: string;
    summaryEn: string;
    applicationZh: string;
    applicationEn: string;
    specificationsZh: string;
    specificationsEn: string;
    packagingZh: string;
    packagingEn: string;
    imageUrl: string;
    featured: number;
    seoTitleZh: string;
    seoTitleEn: string;
    seoDescriptionZh: string;
    seoDescriptionEn: string;
  }
) {
  db.prepare(
    `
      INSERT INTO products (
        category_id, slug, manufacturer_zh, manufacturer_en, model, name_zh, name_en,
        summary_zh, summary_en, application_zh, application_en, specifications_zh,
        specifications_en, packaging_zh, packaging_en, image_url, featured,
        seo_title_zh, seo_title_en, seo_description_zh, seo_description_en
      )
      VALUES (
        @categoryId, @slug, @manufacturerZh, @manufacturerEn, @model, @nameZh, @nameEn,
        @summaryZh, @summaryEn, @applicationZh, @applicationEn, @specificationsZh,
        @specificationsEn, @packagingZh, @packagingEn, @imageUrl, @featured,
        @seoTitleZh, @seoTitleEn, @seoDescriptionZh, @seoDescriptionEn
      )
      ON CONFLICT(slug) DO UPDATE SET
        category_id = excluded.category_id,
        manufacturer_zh = excluded.manufacturer_zh,
        manufacturer_en = excluded.manufacturer_en,
        model = excluded.model,
        name_zh = excluded.name_zh,
        name_en = excluded.name_en,
        summary_zh = excluded.summary_zh,
        summary_en = excluded.summary_en,
        application_zh = excluded.application_zh,
        application_en = excluded.application_en,
        specifications_zh = excluded.specifications_zh,
        specifications_en = excluded.specifications_en,
        packaging_zh = excluded.packaging_zh,
        packaging_en = excluded.packaging_en,
        image_url = excluded.image_url,
        featured = excluded.featured,
        seo_title_zh = excluded.seo_title_zh,
        seo_title_en = excluded.seo_title_en,
        seo_description_zh = excluded.seo_description_zh,
        seo_description_en = excluded.seo_description_en
    `
  ).run(input);

  return (
    db.prepare("SELECT id FROM products WHERE slug = ?").get(input.slug) as {
      id: number;
    }
  ).id;
}

function seedDocuments(
  db: Database.Database,
  productIds: Record<string, number>,
  products: readonly ProductSeed[]
) {
  db.prepare("DELETE FROM document_requests").run();
  db.prepare("DELETE FROM documents").run();

  const insertDocument = db.prepare(
    `
      INSERT INTO documents (
        product_id, title_zh, title_en, description_zh, description_en,
        access_level, file_path, storage_path, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  );

  products.forEach((product, index) => {
    insertDocument.run(
      productIds[product.key],
      `${product.nameZh} 官方产品页`,
      `${product.nameEn || product.model} Official Product Page`,
      "用于核对正式名称、公开规格、图片与资料入口。",
      "Official page for model naming, public specifications, images, and reference materials.",
      product.documentAccess ?? "public",
      product.sourceUrl,
      `official:${product.key}`,
      index + 1
    );
  });
}

function seedNews(db: Database.Database) {
  db.prepare("DELETE FROM news").run();
}

export function seedDemoContent(db: Database.Database) {
  db.prepare("DELETE FROM document_requests").run();
  db.prepare("DELETE FROM documents").run();
  db.prepare("DELETE FROM news").run();
  db.prepare("DELETE FROM products").run();
  db.prepare("DELETE FROM categories").run();

  const categoryIds = Object.fromEntries(
    realCategories.map((category) => [category.slug, upsertCategory(db, category)])
  ) as Record<string, number>;

  const productIds: Record<string, number> = {};

  realProducts.forEach((product) => {
    productIds[product.key] = upsertProduct(db, {
      categoryId: categoryIds[product.categorySlug],
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
      featured: product.featured,
      seoTitleZh: product.seoTitleZh,
      seoTitleEn: product.seoTitleEn,
      seoDescriptionZh: product.seoDescriptionZh,
      seoDescriptionEn: product.seoDescriptionEn
    });
  });

  seedDocuments(db, productIds, realProducts);
  seedNews(db);
}
