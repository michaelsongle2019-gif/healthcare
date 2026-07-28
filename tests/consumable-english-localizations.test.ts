import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

type Localization = Record<
  string,
  {
    nameEn: string;
    summaryEn: string;
    applicationEn: string;
    specificationsEn: string;
    packagingEn: string;
    manufacturerEn: string;
  }
>;

const localizations = JSON.parse(
  readFileSync(
    join(process.cwd(), "data", "consumable-english-localizations.json"),
    "utf8"
  )
) as Localization;

describe("legacy consumable English localizations", () => {
  test("covers all 38 imported consumable products", () => {
    expect(Object.keys(localizations)).toHaveLength(38);
  });

  test("contains complete English-only public content", () => {
    for (const [nameZh, product] of Object.entries(localizations)) {
      expect(nameZh).toMatch(/[\u3400-\u9fff]/);

      for (const value of Object.values(product)) {
        expect(value.trim()).not.toBe("");
        expect(value).not.toMatch(/[\u3400-\u9fff]/);
        expect(value).not.toMatch(/EN pending|待补充|需求等级/);
      }
    }
  });
});
