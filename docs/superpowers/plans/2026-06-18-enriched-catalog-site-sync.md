# Enriched Catalog Site Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the demo website catalog with the real Excel `Enriched` product data and make homepage/product pages read from that real dataset.

**Architecture:** Generate a TypeScript catalog seed file from the approved workbook, seed the SQLite database from that file, and remove homepage dependence on hard-coded demo hero products. Keep the existing database schema and route structure.

**Tech Stack:** Next.js, TypeScript, better-sqlite3, Vitest, Python openpyxl tooling

---

### Task 1: Lock the target behavior with failing tests

**Files:**
- Create: `tests/seed-real-catalog.test.ts`
- Modify: none
- Test: `tests/seed-real-catalog.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
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
    expect(
      products.some((product) => String(product.nameZh).includes("图迈"))
    ).toBe(true);
    expect(products.some((product) => String(product.model) === "uCT 780")).toBe(false);
    expect(categories.some((category) => String(category.nameZh).includes("超声刀"))).toBe(
      true
    );
    expect(documents.length).toBe(products.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/seed-real-catalog.test.ts`

Expected: FAIL because the current seed still inserts the old demo catalog and does not include `Y16` or `图迈`.

- [ ] **Step 3: Write minimal implementation**

Implementation will be completed in Tasks 2-4.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/seed-real-catalog.test.ts`

Expected: PASS after Tasks 2-4 are complete.

- [ ] **Step 5: Commit**

```bash
git add tests/seed-real-catalog.test.ts
git commit -m "test: cover real catalog seeding"
```

### Task 2: Generate a site-ready catalog dataset from the workbook

**Files:**
- Create: `scripts/export_enriched_catalog_to_site.py`
- Create: `src/lib/site-catalog.generated.ts`
- Modify: none
- Test: `tests/seed-real-catalog.test.ts`

- [ ] **Step 1: Write the export script**

Script responsibilities:
- Read `C:\Users\Michael\Desktop\agent_products_0617_enriched_official_verified_links.xlsx`
- Use the `Enriched` sheet
- Map rows into:
  - category records
  - product seed records
  - one source document record per product
- Emit `src/lib/site-catalog.generated.ts`

- [ ] **Step 2: Run the export script**

Run: `python .\scripts\export_enriched_catalog_to_site.py`

Expected: a new file `src/lib/site-catalog.generated.ts` is created.

- [ ] **Step 3: Verify generated output shape**

Check that the generated file exports:
- `realCategories`
- `realProducts`

And that one of the generated products includes `Y16 超声软组织切割止血手术设备`.

- [ ] **Step 4: Commit**

```bash
git add scripts/export_enriched_catalog_to_site.py src/lib/site-catalog.generated.ts
git commit -m "feat: generate site catalog data from enriched workbook"
```

### Task 3: Switch seed data from demo catalog to real catalog

**Files:**
- Modify: `src/lib/seed.ts`
- Test: `tests/seed-real-catalog.test.ts`

- [ ] **Step 1: Import the generated catalog**

Add imports in `src/lib/seed.ts` for the generated arrays and use them as the only source of category/product seeding.

- [ ] **Step 2: Seed documents from source links**

Keep one document row per product, using the generated source-link payload so the detail page still has a usable official-source entry.

- [ ] **Step 3: Run the failing test again**

Run: `npm test -- tests/seed-real-catalog.test.ts`

Expected: PASS because the seeded database now contains real products and not the old demo set.

- [ ] **Step 4: Commit**

```bash
git add src/lib/seed.ts tests/seed-real-catalog.test.ts
git commit -m "feat: seed site from enriched catalog data"
```

### Task 4: Remove old homepage hero dependency on demo products

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Test: `tests/seed-real-catalog.test.ts`

- [ ] **Step 1: Replace static hero slide usage**

Update the homepage to derive 1-3 hero slides from current featured products instead of using the old hard-coded `heroSlides`.

- [ ] **Step 2: Keep the current visual layout**

Do not redesign the hero. Only swap the data source so the homepage reflects the seeded real catalog.

- [ ] **Step 3: Run targeted tests**

Run: `npm test -- tests/seed-real-catalog.test.ts tests/repository.test.ts`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: drive homepage hero from real product catalog"
```

### Task 5: Refresh the local database and verify the site

**Files:**
- Create: `scripts/refresh_site_catalog.mjs` or `scripts/refresh_site_catalog.py`
- Modify: `data/healthcare.db` at runtime only
- Test: local app at `http://localhost:3000/`

- [ ] **Step 1: Write the refresh script**

The script should:
- open the existing database
- initialize schema if needed
- rerun catalog seeding

- [ ] **Step 2: Run refresh**

Run: `node .\scripts\refresh_site_catalog.mjs`

Expected: the local database contains only the real product catalog.

- [ ] **Step 3: Verify the website**

Check:
- homepage hero shows real products
- `/zh/products` lists only real products from the workbook
- old demo products like `uCT 780` no longer appear
- a detail page such as `图迈` or `Y16` renders correctly

- [ ] **Step 4: Commit**

```bash
git add scripts/refresh_site_catalog.mjs
git commit -m "chore: add local catalog refresh script"
```
