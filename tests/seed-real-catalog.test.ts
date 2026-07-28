import { describe, expect, test } from "vitest";
import { createDatabase, initializeDatabase, seedDatabaseIfEmpty } from "@/lib/db";
import { listCategories, listDocuments, listProducts } from "@/lib/repository";
import { seedDemoContent } from "@/lib/seed";

describe("real catalog seeding", () => {
  test("seeds real Enriched products instead of the old demo catalog", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);

    seedDemoContent(db);

    const products = listProducts(db);
    const categories = listCategories(db);
    const documents = listDocuments(db);

    expect(products.some((product) => String(product.model).includes("Y16"))).toBe(true);
    expect(products.some((product) => String(product.slug) === "7-1-toumai")).toBe(true);
    expect(products.some((product) => String(product.model) === "uCT 780")).toBe(false);
    expect(
      categories.some(
        (category) =>
          String(category.slug) === "minimally-invasive-surgical-devices"
      )
    ).toBe(true);
    expect(documents.length).toBe(products.length);
  });

  test("keeps Chinese product summaries factual and every product has an image", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);

    seedDemoContent(db);

    const products = listProducts(db);
    const summaryPrefixes = ["高。", "中高。", "中。", "较高。", "较低。", "低。"];

    expect(products.every((product) => String(product.imageUrl || "").trim().length > 0)).toBe(true);
    expect(
      products.every((product) => {
        const summary = String(product.summaryZh || "");
        return (
          !summaryPrefixes.some((prefix) => summary.startsWith(prefix)) &&
          !summary.includes("对标厂家：") &&
          !summary.includes("使用科室：")
        );
      })
    ).toBe(true);
  });

  test("runtime seeding does not overwrite an already populated catalog", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);

    seedDemoContent(db);
    const initialProducts = listProducts(db).length;

    db.prepare(
      `
        INSERT INTO products (
          category_id, slug, manufacturer_zh, manufacturer_en, model, name_zh, name_en,
          summary_zh, summary_en, application_zh, application_en, specifications_zh,
          specifications_en, packaging_zh, packaging_en, image_url, featured,
          seo_title_zh, seo_title_en, seo_description_zh, seo_description_en
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `
    ).run(
      db.prepare("SELECT id FROM categories LIMIT 1").get().id,
      "manual-added-product",
      "测试厂家",
      "Test Manufacturer",
      "Manual Product",
      "手工新增产品",
      "Manual Added Product",
      "手工新增摘要",
      "Manual summary",
      "手工新增应用",
      "Manual application",
      "手工新增规格",
      "Manual specifications",
      "手工新增包装",
      "Manual packaging",
      "",
      0,
      "手工新增产品",
      "Manual Added Product",
      "手工新增摘要",
      "Manual summary"
    );

    seedDatabaseIfEmpty(db);

    const products = listProducts(db);

    expect(products.length).toBe(initialProducts + 1);
    expect(products.some((product) => String(product.slug) === "manual-added-product")).toBe(
      true
    );
  });
});
