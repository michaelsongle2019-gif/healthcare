import type Database from "better-sqlite3";
import { getDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import type {
  CategoryInput,
  DocumentInput,
  DocumentRequestInput,
  InquiryInput,
  NewsInput,
  ProductInput,
  SettingsInput
} from "@/lib/validators";

function useDb(db?: Database.Database) {
  return db ?? getDatabase();
}

export type CategoryRecord = {
  id: unknown;
  slug: unknown;
  nameZh: unknown;
  nameEn: unknown;
  descriptionZh: unknown;
  descriptionEn: unknown;
  sortOrder: unknown;
};

export type ProductRecord = {
  id: unknown;
  categoryId: unknown;
  slug: unknown;
  manufacturerZh: unknown;
  manufacturerEn: unknown;
  model: unknown;
  nameZh: unknown;
  nameEn: unknown;
  summaryZh: unknown;
  summaryEn: unknown;
  applicationZh: unknown;
  applicationEn: unknown;
  specificationsZh: unknown;
  specificationsEn: unknown;
  packagingZh: unknown;
  packagingEn: unknown;
  imageUrl: unknown;
  featured: unknown;
  seoTitleZh: unknown;
  seoTitleEn: unknown;
  seoDescriptionZh: unknown;
  seoDescriptionEn: unknown;
  categorySlug: unknown;
  categoryNameZh: unknown;
  categoryNameEn: unknown;
};

export type DocumentRecord = {
  id: unknown;
  productId: unknown;
  titleZh: unknown;
  titleEn: unknown;
  descriptionZh: unknown;
  descriptionEn: unknown;
  accessLevel: unknown;
  filePath: unknown;
  storagePath: unknown;
  sortOrder: unknown;
  productNameZh: unknown;
  productNameEn: unknown;
};

export type NewsRecord = {
  id: unknown;
  slug: unknown;
  titleZh: unknown;
  titleEn: unknown;
  summaryZh: unknown;
  summaryEn: unknown;
  contentZh: unknown;
  contentEn: unknown;
  publishedAt: unknown;
  featured: unknown;
};

export type DocumentRequestRecord = {
  id: unknown;
  company: unknown;
  name: unknown;
  email: unknown;
  phone: unknown;
  message: unknown;
  created_at: unknown;
  documentTitleZh: unknown;
  documentTitleEn: unknown;
};

export type InquiryRecord = {
  id: unknown;
  name: unknown;
  company: unknown;
  email: unknown;
  phone: unknown;
  country: unknown;
  message: unknown;
  created_at: unknown;
};

export type AuditLogRecord = {
  id: unknown;
  actor: unknown;
  action: unknown;
  details: unknown;
  created_at: unknown;
};

function mapCategory(row: Record<string, unknown>): CategoryRecord {
  return {
    id: row.id,
    slug: row.slug,
    nameZh: row.name_zh,
    nameEn: row.name_en,
    descriptionZh: row.description_zh,
    descriptionEn: row.description_en,
    sortOrder: row.sort_order
  };
}

function mapProduct(row: Record<string, unknown>): ProductRecord {
  return {
    id: row.id,
    categoryId: row.category_id,
    slug: row.slug,
    manufacturerZh: row.manufacturer_zh,
    manufacturerEn: row.manufacturer_en,
    model: row.model,
    nameZh: row.name_zh,
    nameEn: row.name_en,
    summaryZh: row.summary_zh,
    summaryEn: row.summary_en,
    applicationZh: row.application_zh,
    applicationEn: row.application_en,
    specificationsZh: row.specifications_zh,
    specificationsEn: row.specifications_en,
    packagingZh: row.packaging_zh,
    packagingEn: row.packaging_en,
    imageUrl: row.image_url,
    featured: row.featured,
    seoTitleZh: row.seo_title_zh,
    seoTitleEn: row.seo_title_en,
    seoDescriptionZh: row.seo_description_zh,
    seoDescriptionEn: row.seo_description_en,
    categorySlug: row.category_slug,
    categoryNameZh: row.category_name_zh,
    categoryNameEn: row.category_name_en
  };
}

function mapDocument(row: Record<string, unknown>): DocumentRecord {
  return {
    id: row.id,
    productId: row.product_id,
    titleZh: row.title_zh,
    titleEn: row.title_en,
    descriptionZh: row.description_zh,
    descriptionEn: row.description_en,
    accessLevel: row.access_level,
    filePath: row.file_path,
    storagePath: row.storage_path,
    sortOrder: row.sort_order,
    productNameZh: row.product_name_zh,
    productNameEn: row.product_name_en
  };
}

function mapNews(row: Record<string, unknown>): NewsRecord {
  return {
    id: row.id,
    slug: row.slug,
    titleZh: row.title_zh,
    titleEn: row.title_en,
    summaryZh: row.summary_zh,
    summaryEn: row.summary_en,
    contentZh: row.content_zh,
    contentEn: row.content_en,
    publishedAt: row.published_at,
    featured: row.featured
  };
}

export function saveCategory(database: Database.Database | undefined, input: CategoryInput) {
  const db = useDb(database);

  if (input.id) {
    db.prepare(
      `
        UPDATE categories
        SET slug = @slug,
            name_zh = @nameZh,
            name_en = @nameEn,
            description_zh = @descriptionZh,
            description_en = @descriptionEn,
            sort_order = @sortOrder
        WHERE id = @id
      `
    ).run(input);

    return input.id;
  }

  const result = db.prepare(
    `
      INSERT INTO categories (slug, name_zh, name_en, description_zh, description_en, sort_order)
      VALUES (@slug, @nameZh, @nameEn, @descriptionZh, @descriptionEn, @sortOrder)
    `
  ).run(input);

  return Number(result.lastInsertRowid);
}

export function listCategories(database?: Database.Database): CategoryRecord[] {
  return (useDb(database)
    .prepare("SELECT * FROM categories ORDER BY sort_order ASC, id ASC")
    .all() as Record<string, unknown>[]).map(mapCategory);
}

export function saveProduct(database: Database.Database | undefined, input: ProductInput) {
  const db = useDb(database);
  const payload = {
    ...input,
    featured: input.featured ? 1 : 0
  };

  if (input.id) {
    db.prepare(
      `
        UPDATE products
        SET category_id = @categoryId,
            slug = @slug,
            manufacturer_zh = @manufacturerZh,
            manufacturer_en = @manufacturerEn,
            model = @model,
            name_zh = @nameZh,
            name_en = @nameEn,
            summary_zh = @summaryZh,
            summary_en = @summaryEn,
            application_zh = @applicationZh,
            application_en = @applicationEn,
            specifications_zh = @specificationsZh,
            specifications_en = @specificationsEn,
            packaging_zh = @packagingZh,
            packaging_en = @packagingEn,
            image_url = @imageUrl,
            featured = @featured,
            seo_title_zh = @seoTitleZh,
            seo_title_en = @seoTitleEn,
            seo_description_zh = @seoDescriptionZh,
            seo_description_en = @seoDescriptionEn
        WHERE id = @id
      `
    ).run(payload);

    return input.id;
  }

  const result = db.prepare(
    `
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
    `
  ).run(payload);

  return Number(result.lastInsertRowid);
}

export function listProducts(database?: Database.Database): ProductRecord[] {
  return (useDb(database)
    .prepare(
      `
        SELECT
          products.*,
          categories.slug AS category_slug,
          categories.name_zh AS category_name_zh,
          categories.name_en AS category_name_en
        FROM products
        INNER JOIN categories ON categories.id = products.category_id
        ORDER BY products.featured DESC, products.id ASC
      `
    )
    .all() as Record<string, unknown>[]).map(mapProduct);
}

export function findProductBySlug(
  slug: string,
  database?: Database.Database
): ProductRecord | null {
  const row = useDb(database)
    .prepare(
      `
        SELECT
          products.*,
          categories.slug AS category_slug,
          categories.name_zh AS category_name_zh,
          categories.name_en AS category_name_en
        FROM products
        INNER JOIN categories ON categories.id = products.category_id
        WHERE products.slug = ?
      `
    )
    .get(slug) as Record<string, unknown> | undefined;

  return row ? mapProduct(row) : null;
}

export function saveDocument(database: Database.Database | undefined, input: DocumentInput) {
  const db = useDb(database);
  const payload = {
    ...input,
    productId: input.productId ?? null,
    filePath: input.filePath ?? "",
    storagePath: input.storagePath ?? ""
  };

  if (input.id) {
    db.prepare(
      `
        UPDATE documents
        SET product_id = @productId,
            title_zh = @titleZh,
            title_en = @titleEn,
            description_zh = @descriptionZh,
            description_en = @descriptionEn,
            access_level = @accessLevel,
            file_path = @filePath,
            storage_path = @storagePath,
            sort_order = @sortOrder
        WHERE id = @id
      `
    ).run(payload);

    return input.id;
  }

  const result = db.prepare(
    `
      INSERT INTO documents (
        product_id, title_zh, title_en, description_zh, description_en,
        access_level, file_path, storage_path, sort_order
      )
      VALUES (
        @productId, @titleZh, @titleEn, @descriptionZh, @descriptionEn,
        @accessLevel, @filePath, @storagePath, @sortOrder
      )
    `
  ).run(payload);

  return Number(result.lastInsertRowid);
}

export function listDocuments(database?: Database.Database): DocumentRecord[] {
  return (useDb(database)
    .prepare(
      `
        SELECT
          documents.*,
          products.name_zh AS product_name_zh,
          products.name_en AS product_name_en
        FROM documents
        LEFT JOIN products ON products.id = documents.product_id
        ORDER BY documents.sort_order ASC, documents.id DESC
      `
    )
    .all() as Record<string, unknown>[]).map(mapDocument);
}

export function findDocumentById(
  id: number,
  database?: Database.Database
): DocumentRecord | null {
  const row = useDb(database)
    .prepare(
      `
        SELECT
          documents.*,
          products.name_zh AS product_name_zh,
          products.name_en AS product_name_en
        FROM documents
        LEFT JOIN products ON products.id = documents.product_id
        WHERE documents.id = ?
      `
    )
    .get(id) as Record<string, unknown> | undefined;

  return row ? mapDocument(row) : null;
}

export function createDocumentRequest(
  database: Database.Database | undefined,
  input: DocumentRequestInput
) {
  const db = useDb(database);
  const result = db.prepare(
    `
      INSERT INTO document_requests (document_id, company, name, email, phone, message)
      VALUES (@documentId, @company, @name, @email, @phone, @message)
    `
  ).run(input);

  return Number(result.lastInsertRowid);
}

export function listDocumentRequests(
  database?: Database.Database
): DocumentRequestRecord[] {
  return useDb(database)
    .prepare(
      `
        SELECT
          document_requests.*,
          documents.title_zh AS documentTitleZh,
          documents.title_en AS documentTitleEn
        FROM document_requests
        INNER JOIN documents ON documents.id = document_requests.document_id
        ORDER BY document_requests.created_at DESC
      `
    )
    .all() as DocumentRequestRecord[];
}

export function saveNews(database: Database.Database | undefined, input: NewsInput) {
  const db = useDb(database);
  const payload = {
    ...input,
    featured: input.featured ? 1 : 0
  };

  if (input.id) {
    db.prepare(
      `
        UPDATE news
        SET slug = @slug,
            title_zh = @titleZh,
            title_en = @titleEn,
            summary_zh = @summaryZh,
            summary_en = @summaryEn,
            content_zh = @contentZh,
            content_en = @contentEn,
            published_at = @publishedAt,
            featured = @featured
        WHERE id = @id
      `
    ).run(payload);

    return input.id;
  }

  const result = db.prepare(
    `
      INSERT INTO news (
        slug, title_zh, title_en, summary_zh, summary_en,
        content_zh, content_en, published_at, featured
      )
      VALUES (
        @slug, @titleZh, @titleEn, @summaryZh, @summaryEn,
        @contentZh, @contentEn, @publishedAt, @featured
      )
    `
  ).run(payload);

  return Number(result.lastInsertRowid);
}

export function listNews(database?: Database.Database): NewsRecord[] {
  return (useDb(database)
    .prepare("SELECT * FROM news ORDER BY published_at DESC, id DESC")
    .all() as Record<string, unknown>[]).map(mapNews);
}

export function findNewsBySlug(
  slug: string,
  database?: Database.Database
): NewsRecord | null {
  const row = useDb(database)
    .prepare("SELECT * FROM news WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;

  return row ? mapNews(row) : null;
}

export function saveInquiry(database: Database.Database | undefined, input: InquiryInput) {
  const db = useDb(database);
  const result = db.prepare(
    `
      INSERT INTO inquiries (name, company, email, phone, country, message)
      VALUES (@name, @company, @email, @phone, @country, @message)
    `
  ).run(input);

  return Number(result.lastInsertRowid);
}

export function listInquiries(database?: Database.Database): InquiryRecord[] {
  return useDb(database)
    .prepare("SELECT * FROM inquiries ORDER BY created_at DESC")
    .all() as InquiryRecord[];
}

export async function updateAdminPassword(
  username: string,
  password: string,
  database?: Database.Database
) {
  const db = useDb(database);
  const passwordHash = await hashPassword(password);

  db.prepare(
    `
      UPDATE admins
      SET password_hash = ?
      WHERE username = ?
    `
  ).run(passwordHash, username);
}

export function getSiteSettings(database?: Database.Database) {
  const db = useDb(database);
  const rows = db.prepare("SELECT key, value FROM site_settings").all() as Array<{
    key: string;
    value: string;
  }>;

  return rows.reduce<Record<string, string>>((accumulator, row) => {
    accumulator[row.key] = row.value;
    return accumulator;
  }, {});
}

export function saveSiteSettings(
  database: Database.Database | undefined,
  input: SettingsInput
) {
  const db = useDb(database);
  const statement = db.prepare(
    `
      INSERT INTO site_settings (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `
  );

  Object.entries(input).forEach(([key, value]) => {
    statement.run(key, value);
  });
}

export function logAuditAction(
  actor: string,
  action: string,
  details: string,
  database?: Database.Database
) {
  useDb(database)
    .prepare(
      `
        INSERT INTO audit_logs (actor, action, details)
        VALUES (?, ?, ?)
      `
    )
    .run(actor, action, details);
}

export function listAuditLogs(database?: Database.Database): AuditLogRecord[] {
  return useDb(database)
    .prepare("SELECT * FROM audit_logs ORDER BY created_at DESC, id DESC")
    .all() as AuditLogRecord[];
}
