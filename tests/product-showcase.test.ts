import { describe, expect, test } from "vitest";
import {
  getCatalogBenchmark,
  getProductShowcase,
  getShowcaseFallbackProduct
} from "@/lib/product-showcase";
import { realProducts } from "@/lib/site-catalog.generated";

describe("product showcase benchmark data", () => {
  test("every current real-catalog product exposes a benchmark table", () => {
    for (const product of realProducts) {
      const benchmark = getCatalogBenchmark(product.slug);

      expect(benchmark, product.slug).toBeDefined();
      expect(benchmark?.ourLabelEn).not.toMatch(/[\u3400-\u9fff]/);
      expect(benchmark?.comparisonRows.length).toBeGreaterThanOrEqual(5);
    }
  });

  test("english benchmark content does not contain Chinese characters", () => {
    for (const product of realProducts) {
      const benchmark = getCatalogBenchmark(product.slug);

      expect(benchmark?.titleEn || "").not.toMatch(/[\u3400-\u9fff]/);
      expect(benchmark?.publicSummaryEn || "").not.toMatch(/[\u3400-\u9fff]/);

      for (const row of benchmark?.comparisonRows ?? []) {
        expect(row.labelEn, `${product.slug}:${row.labelEn}`).not.toMatch(
          /[\u3400-\u9fff]/
        );
        expect(row.ourValueEn, `${product.slug}:${row.labelEn}:our`).not.toMatch(
          /[\u3400-\u9fff]/
        );
        expect(
          row.benchmarkValueEn,
          `${product.slug}:${row.labelEn}:peer`
        ).not.toMatch(/[\u3400-\u9fff]/);
      }
    }
  });

  test("benchmark rows do not expose confidential price information", () => {
    for (const product of realProducts) {
      const benchmark = getCatalogBenchmark(product.slug);

      for (const row of benchmark?.comparisonRows ?? []) {
        expect(
          `${row.ourValueZh} ${row.ourValueEn} ${row.benchmarkValueZh} ${row.benchmarkValueEn}`,
          `${product.slug}:${row.labelEn}`
        ).not.toMatch(/价格参考|价格带|价位|报价|Price Reference|price band|CNY|USD|万元|元\//i);
      }
    }
  });

  test("benchmark rows do not include regulatory or delivery notes as performance items", () => {
    for (const product of realProducts) {
      const benchmark = getCatalogBenchmark(product.slug);

      expect(
        (benchmark?.comparisonRows ?? []).some(
          (row) => row.labelEn === "Published regulatory or delivery note"
        ),
        product.slug
      ).toBe(false);
    }
  });

  test("real-catalog benchmark labels match category-level competitors", () => {
    expect(getCatalogBenchmark("1-1-y16")?.benchmarkLabelEn).toBe(
      "ETHICON HARMONIC"
    );
    expect(getCatalogBenchmark("2-1")?.benchmarkLabelEn).toBe("ETHICON ECHELON");
    expect(getCatalogBenchmark("3-1-hypixel-ux5-4k")?.benchmarkLabelEn).toBe(
      "Stryker 1688 AIM 4K Platform"
    );
    expect(getCatalogBenchmark("7-1-toumai")?.benchmarkLabelEn).toBe(
      "da Vinci Xi"
    );
    expect(getCatalogBenchmark("8-1-excelim-116")?.benchmarkLabelEn).toBe(
      "Medtronic StealthStation S8"
    );
  });

  test("MRI showcase products expose dynamic benchmark labels with only public comparable rows", () => {
    const benchmarkProducts = [
      { slug: "umr-790", peer: "MAGNETOM Vida" },
      { slug: "umr-780", peer: "MAGNETOM Vida" },
      { slug: "umr-680", peer: "Philips MR 5300" },
      { slug: "neumr-rena", peer: "Philips MR 5300" }
    ];

    for (const product of benchmarkProducts) {
      const showcase = getProductShowcase(product.slug);
      const benchmark = showcase?.benchmark;
      const rows = benchmark?.comparisonRows ?? [];

      expect(showcase).not.toBeNull();
      expect(benchmark).toBeDefined();
      expect(benchmark?.ourLabelEn).toBe(showcase?.heroTitleEn);
      expect(benchmark?.benchmarkLabelEn).toBe(product.peer);
      expect(rows.length).toBeGreaterThanOrEqual(5);
      expect(
        rows.some(
          (row) =>
            /未公开|未披露|not disclosed|not listed/i.test(row.ourValueZh) ||
            /未公开|未披露|not disclosed|not listed/i.test(row.ourValueEn) ||
            /未公开|未披露|not disclosed|not listed/i.test(row.benchmarkValueZh) ||
            /未公开|未披露|not disclosed|not listed/i.test(row.benchmarkValueEn)
        )
      ).toBe(false);
    }
  });

  test("uMR 680 exposes objective public benchmark copy and structured comparison rows", () => {
    const showcase = getProductShowcase("umr-680");
    const rows = showcase?.benchmark?.comparisonRows ?? [];

    expect(showcase).not.toBeNull();
    expect(showcase?.benchmark).toBeDefined();
    expect(showcase?.benchmark?.publicSummaryZh).not.toContain("采购");
    expect(showcase?.benchmark?.publicSummaryZh).not.toContain("非洲");
    expect(showcase?.benchmark?.publicSummaryEn).not.toContain("buyers");
    expect(showcase?.benchmark?.publicSummaryEn).not.toContain("procurement");
    expect(rows.length).toBeGreaterThanOrEqual(8);
    expect(rows[0]).toMatchObject({
      benchmarkValueEn: "Philips MR 5300"
    });
    expect(
      rows.some(
        (row) =>
          /未公开|未披露|not disclosed|not listed/i.test(row.ourValueZh) ||
          /未公开|未披露|not disclosed|not listed/i.test(row.ourValueEn) ||
          /未公开|未披露|not disclosed|not listed/i.test(row.benchmarkValueZh) ||
          /未公开|未披露|not disclosed|not listed/i.test(row.benchmarkValueEn)
      )
    ).toBe(false);
    expect(rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          labelEn: "Maximum gradient strength",
          ourValueEn: "45 mT/m",
          benchmarkValueEn: "33 mT/m"
        }),
        expect.objectContaining({
          labelEn: "Maximum slew rate",
          ourValueEn: "200 T/m/s",
          benchmarkValueEn: "120 T/m/s"
        }),
        expect.objectContaining({
          labelEn: "Magnet homogeneity",
          ourValueEn: "0.033 ppm @ 30 cm DSV (Typical)"
        })
      ])
    );
    expect(showcase?.benchmark?.internalReference.brand).toBe("Philips");
    expect(showcase?.benchmark?.internalReference.model).toBe("MR 5300");
    expect(showcase?.benchmark?.internalReference.sourceLinks.length).toBeGreaterThanOrEqual(3);
  });

  test("uMR 790 and NeuMR Rena expose concrete benchmark dimensions", () => {
    const umr790Rows = getProductShowcase("umr-790")?.benchmark?.comparisonRows ?? [];
    const neumrRows = getProductShowcase("neumr-rena")?.benchmark?.comparisonRows ?? [];

    expect(umr790Rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          labelEn: "Maximum gradient strength",
          ourValueEn: "100 mT/m",
          benchmarkValueEn: "60 mT/m"
        }),
        expect.objectContaining({
          labelEn: "Maximum slew rate",
          ourValueEn: "200 T/m/s",
          benchmarkValueEn: "200 T/m/s"
        })
      ])
    );

    expect(neumrRows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          labelEn: "Maximum gradient strength",
          ourValueEn: "46 mT/m",
          benchmarkValueEn: "33 mT/m"
        }),
        expect.objectContaining({
          labelEn: "Maximum slew rate",
          ourValueEn: "160 T/m/s",
          benchmarkValueEn: "120 T/m/s"
        })
      ])
    );
  });

  test("uMR 680 can be rendered through showcase fallback product data", () => {
    const product = getShowcaseFallbackProduct("umr-680");

    expect(product).not.toBeNull();
    expect(product).toMatchObject({
      slug: "umr-680",
      manufacturerEn: "United Imaging",
      model: "uMR 680",
      categoryNameEn: "MR Systems"
    });
  });
});
