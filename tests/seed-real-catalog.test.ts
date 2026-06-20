import { describe, expect, test } from "vitest";
import { createDatabase, initializeDatabase } from "@/lib/db";
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
    expect(categories.some((category) => String(category.slug) === "ultrasonic-surgery-systems-consumables")).toBe(true);
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
});
