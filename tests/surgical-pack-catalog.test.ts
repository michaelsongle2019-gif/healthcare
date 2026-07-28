import { createHash } from "node:crypto";
import { describe, expect, test } from "vitest";
import { createDatabase, initializeDatabase } from "@/lib/db";
import {
  findProductBySlug,
  listProducts,
  saveCategory,
  saveProduct
} from "@/lib/repository";
import {
  installSurgicalPackCatalog,
  OPERATING_ROOM_CONSUMABLES,
  SURGICAL_PACKS
} from "@/lib/surgical-pack-catalog";

describe("surgical pack catalog", () => {
  test("contains all 16 reviewed packs and professional bowl terminology", () => {
    expect(SURGICAL_PACKS).toHaveLength(16);
    expect(SURGICAL_PACKS[0].nameEn).toBe("Disposable Angiography Pack");
    expect(SURGICAL_PACKS[0].contentsEn).toContain("Graduated bowl, 500 mL");
    expect(SURGICAL_PACKS[15].nameEn).toBe(
      "Disposable Dilation and Curettage (D&C) Pack"
    );
    expect(SURGICAL_PACKS.every((pack) => pack.contentsZh.length === pack.contentsEn.length))
      .toBe(true);
  });

  test("matches the reviewed workbook pack names and component counts", () => {
    const reviewedPackStructure = [
      ["Disposable Angiography Pack", 10],
      ["Disposable General Ophthalmic Pack", 8],
      ["Disposable Basic Procedure Pack", 6],
      ["Disposable Cataract Surgery Pack", 5],
      ["Disposable Dental Care Pack", 7],
      ["Disposable Vaginal Delivery Pack", 12],
      ["Disposable Dental Implant Pack", 10],
      ["Disposable Dressing Change Kit", 7],
      ["Disposable Suture Kit", 11],
      ["Disposable Caesarean Section Pack", 6],
      ["Disposable Upper Extremity Pack", 10],
      ["Disposable Lower Extremity Pack", 10],
      ["Disposable Shoulder Surgery Pack", 11],
      ["Disposable Knee Surgery Pack", 11],
      ["Disposable Laparoscopy Pack", 8],
      ["Disposable Dilation and Curettage (D&C) Pack", 11]
    ];

    expect(
      SURGICAL_PACKS.map((pack) => [pack.nameEn, pack.contentsEn.length])
    ).toEqual(reviewedPackStructure);
    expect(SURGICAL_PACKS[9].contentsEn).toContain(
      "Mayo stand cover, 80 × 145 cm"
    );
    expect(SURGICAL_PACKS[14].contentsEn).toContain(
      "Back table cover, 150 × 200 cm"
    );

    const reviewedContentSignatures = new Map([
      ["Disposable Angiography Pack", "0c6c1c4a51a4638dc639347161781451eca263971abf93f2c14bdd9468bf3b46"],
      ["Disposable General Ophthalmic Pack", "8ab81f13ac0579b3224ad7a8021d032afb30ea363f52cc79074b71191353d577"],
      ["Disposable Basic Procedure Pack", "ea1e4e09e5a751f3b3a1195517ef01098b59c29bc4af2e2405936d3e9c6078dd"],
      ["Disposable Cataract Surgery Pack", "78900340a6e8c195599bbc0c60b0f5b33f2b290110daf7076decc674c4ea3a36"],
      ["Disposable Dental Care Pack", "d7128066c01e5586712e11f1797ccea1786af7ee6fc06e20310fb1caebaf1305"],
      ["Disposable Vaginal Delivery Pack", "06f5e03d4d18c896281272ac1b51765a31fd1283051f05a7e7d82a5cdcaf2721"],
      ["Disposable Dental Implant Pack", "badd364926ed2b0fa69e20bf346a0466591deec89dc8fabdaa326e3797afa9a6"],
      ["Disposable Dressing Change Kit", "9f3768ea6470adf133e097351c1400e9d63b3598f6052aa32969e56b7b5e915f"],
      ["Disposable Suture Kit", "ce44f66bcde8fe61fb3ddc6971acee8ca7eb16443d0816fa69fd4135e4290080"],
      ["Disposable Caesarean Section Pack", "c60e44136f45b4ae96b7d7966e9434f49e76e2c475303bf171973ab0559b6c5b"],
      ["Disposable Upper Extremity Pack", "da02459d8b11b8cd936033dc59f39ed74754e9aeb83fd4fba329eb020c2f3c88"],
      ["Disposable Lower Extremity Pack", "8f329296e40078054540fe6ad0ecbe6b046e36f00551e6c50246dc3a88896355"],
      ["Disposable Shoulder Surgery Pack", "327c36baf100c44ea5b03c822692ddc9dfde1bb2480302f5b60e940dab7fa2ed"],
      ["Disposable Knee Surgery Pack", "1f09826788d1290e07cbb079633c96294f452f4a7238788d484a7853abab4d94"],
      ["Disposable Laparoscopy Pack", "ec1fb10d7cd675653d60d0e10d4aef90521dcaa56c6d1a04a238920a4457bc22"],
      ["Disposable Dilation and Curettage (D&C) Pack", "d115b93c51762fb2821576ca085cc54530f8f367eb2c0cf6867f68349b684c8f"]
    ]);

    for (const pack of SURGICAL_PACKS) {
      const normalizedContents = pack.contentsEn.map((item) =>
        item
          .replace("Disposable sterile equipment cover, 20 × 20 cm",
            "Disposable sterile equipment cover, 20 × 20")
          .replace(/\s+/g, " ")
          .trim()
      );
      const signature = createHash("sha256")
        .update(JSON.stringify(normalizedContents))
        .digest("hex");
      expect(signature, pack.nameEn).toBe(
        reviewedContentSignatures.get(pack.nameEn)
      );
    }
  });

  test("publishes complete professional English fields for all 24 products", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);
    installSurgicalPackCatalog(db);
    const products = listProducts(db).filter((product) =>
      ["surgical-procedure-packs", "operating-room-consumables"].includes(
        String(product.categorySlug)
      )
    );

    expect(products).toHaveLength(24);
    for (const product of products) {
      for (const value of [
        product.nameEn,
        product.summaryEn,
        product.applicationEn,
        product.specificationsEn,
        product.packagingEn,
        product.seoTitleEn,
        product.seoDescriptionEn
      ]) {
        expect(String(value).trim()).not.toBe("");
        expect(String(value)).not.toMatch(/[\u3400-\u9fff]|EN pending/i);
      }
      expect(product.manufacturerEn).toBe(
        "Manufacturer information available on request"
      );
      expect(String(product.packagingEn)).toContain("available on request");
    }
  });

  test("assigns one clear local catalog image to every surgical pack", () => {
    const imageUrls = SURGICAL_PACKS.map((pack) => pack.imageUrl);

    expect(imageUrls.every((url) => url.startsWith("/uploads/images/surgical-packs/")))
      .toBe(true);
    expect(new Set(imageUrls).size).toBe(16);
  });

  test("defines non-duplicative operating-room consumable families", () => {
    expect(OPERATING_ROOM_CONSUMABLES).toHaveLength(8);
    expect(OPERATING_ROOM_CONSUMABLES.map((item) => item.slug)).toContain(
      "graduated-bowls-and-kidney-basins"
    );
  });

  test("assigns one clear local catalog image to every operating-room product family", () => {
    const imageUrls = OPERATING_ROOM_CONSUMABLES.map((item) => item.imageUrl);

    expect(imageUrls.every((url) => url.startsWith("/uploads/images/operating-room/")))
      .toBe(true);
    expect(new Set(imageUrls).size).toBe(8);
  });

  test("installs idempotently and preserves legacy records", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);
    const legacyCategoryId = saveCategory(db, {
      slug: "protective-consumables",
      nameZh: "防护类",
      nameEn: "Protective Consumables",
      descriptionZh: "既有防护产品",
      descriptionEn: "Existing protective products",
      sortOrder: 1
    });
    saveProduct(db, {
      categoryId: legacyCategoryId,
      slug: "legacy-product",
      manufacturerZh: "既有厂家",
      manufacturerEn: "Existing Manufacturer",
      model: "Legacy Model",
      nameZh: "既有产品",
      nameEn: "Existing Product",
      summaryZh: "既有产品摘要",
      summaryEn: "Existing product summary",
      applicationZh: "既有应用",
      applicationEn: "Existing application",
      specificationsZh: "既有规格",
      specificationsEn: "Existing specifications",
      packagingZh: "既有包装",
      packagingEn: "Existing packaging",
      imageUrl: "",
      featured: false,
      seoTitleZh: "既有产品",
      seoTitleEn: "Existing Product",
      seoDescriptionZh: "既有产品说明",
      seoDescriptionEn: "Existing product description"
    });

    const first = installSurgicalPackCatalog(db);
    const second = installSurgicalPackCatalog(db);

    expect(first.productIds).toHaveLength(16);
    expect(new Set(second.productIds).size).toBe(16);
    expect(
      listProducts(db).filter(
        (product) => product.categorySlug === "surgical-procedure-packs"
      )
    ).toHaveLength(16);
    expect(
      listProducts(db).filter(
        (product) => product.categorySlug === "operating-room-consumables"
      )
    ).toHaveLength(8);
    expect(findProductBySlug("legacy-product", db)?.categorySlug).toBe(
      "protective-consumables"
    );
  });
});
