import { describe, expect, test } from "vitest";
import {
  buildVisibleCatalogStructure,
  getCategoryDisplayNames,
  resolveCatalogCategorySlug
} from "@/lib/catalog-taxonomy";
import type { ProductRecord } from "@/lib/repository";

function createProduct(
  id: number,
  categorySlug: string,
  categoryNameZh: string,
  nameZh: string
): ProductRecord {
  return {
    id,
    categoryId: id,
    slug: `product-${id}`,
    manufacturerZh: "测试厂家",
    manufacturerEn: "Test Manufacturer",
    model: nameZh,
    nameZh,
    nameEn: nameZh,
    summaryZh: "测试摘要",
    summaryEn: "Test summary",
    applicationZh: "测试场景",
    applicationEn: "Test application",
    specificationsZh: "测试规格",
    specificationsEn: "Test specifications",
    packagingZh: "测试包装",
    packagingEn: "Test packaging",
    imageUrl: "",
    featured: 0,
    seoTitleZh: nameZh,
    seoTitleEn: nameZh,
    seoDescriptionZh: "测试描述",
    seoDescriptionEn: "Test description",
    categorySlug,
    categoryNameZh,
    categoryNameEn: categoryNameZh
  };
}

describe("catalog taxonomy", () => {
  test("builds visible top-level and subcategory groups from product data", () => {
    const products = [
      createProduct(1, "protective-consumables", "防护类", "医用外科手套"),
      createProduct(2, "protective-consumables", "防护类", "医用外科口罩"),
      createProduct(3, "monitoring-diagnostic-devices", "监护诊断设备", "病人监护仪"),
      createProduct(4, "minimally-invasive-surgical-devices", "微创外科设备", "Y16 超声软组织切割止血手术设备")
    ];

    const structure = buildVisibleCatalogStructure(products);

    expect(structure.map((group) => group.slug)).toEqual([
      "medical-consumables",
      "medical-devices"
    ]);
    expect(structure[0].children.map((child) => child.slug)).toEqual([
      "protective-consumables"
    ]);
    expect(structure[1].children.map((child) => child.slug)).toEqual([
      "monitoring-diagnostic-devices",
      "minimally-invasive-surgical-devices"
    ]);
    expect(structure[1].children[1].products.map((product) => product.nameZh)).toEqual([
      "Y16 超声软组织切割止血手术设备"
    ]);
  });

  test("returns combined display names for known subcategories and falls back for unknown ones", () => {
    expect(getCategoryDisplayNames("protective-consumables")).toMatchObject({
      topLevelNameZh: "医疗耗材",
      subcategoryNameZh: "防护类"
    });

    expect(getCategoryDisplayNames("unknown-slug")).toMatchObject({
      topLevelNameZh: "医疗设备",
      subcategoryNameZh: "未分类"
    });
  });

  test("adds surgical catalog groups without changing existing mappings", () => {
    expect(getCategoryDisplayNames("protective-consumables").subcategoryNameEn).toBe(
      "Protective Consumables"
    );
    expect(getCategoryDisplayNames("surgical-procedure-packs")).toMatchObject({
      topLevelSlug: "medical-consumables",
      subcategoryNameZh: "手术套包",
      subcategoryNameEn: "Surgical Procedure Packs"
    });
    expect(getCategoryDisplayNames("operating-room-consumables")).toMatchObject({
      topLevelSlug: "medical-consumables",
      subcategoryNameZh: "手术室耗材",
      subcategoryNameEn: "Operating Room Consumables"
    });
  });

  test("maps existing website products and excel products into the approved subcategories", () => {
    expect(
      resolveCatalogCategorySlug({
        slug: "1-1-y16",
        nameZh: "Y16 超声软组织切割止血手术设备"
      })
    ).toBe("minimally-invasive-surgical-devices");

    expect(
      resolveCatalogCategorySlug({
        nameZh: "病人监护仪"
      })
    ).toBe("monitoring-diagnostic-devices");

    expect(
      resolveCatalogCategorySlug({
        nameZh: "医用外科手套"
      })
    ).toBe("protective-consumables");
  });
});
