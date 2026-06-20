# Enriched Catalog Site Sync Design

Goal: replace the demo product catalog on the local website with the real product data from the Excel workbook `Enriched` sheet, while keeping the existing site structure and admin workflow intact.

Design:
- Treat the latest workbook on the desktop as the business-approved source.
- Convert `Enriched` rows into the website's existing `categories`, `products`, and `documents` shape.
- Keep the current front-end routes and cards, but stop using hard-coded demo homepage hero content so the homepage also reflects real products.
- Fill English fields with machine-generated placeholder translations derived from the approved Chinese content, because the user explicitly approved that approach for now.

Field mapping:
- `原设备/耗材名称` + `细分类型` determine the site category.
- `原厂家` maps to `manufacturerZh`; English is a placeholder translation.
- `具体型号/产品名` maps to `model`, `nameZh`, and the product title.
- `关键参数/公开规格` maps to `specificationsZh`.
- `适用范围 / 预期用途` maps to `applicationZh`.
- `确定性说明` and key product identity become `summaryZh`.
- `注册证号 / NMPA` + `注册证名称` + `管理类别` + `注册人 / 持证人` + `NMPA核验状态` map to `packagingZh` as a structured compliance/info block.
- `图片链接` maps to `imageUrl`.
- `来源链接` becomes a product-linked document entry.

Constraints:
- Do not redesign the site structure.
- Remove old demo catalog data from seeded content and homepage hero usage.
- Keep the database schema unchanged unless a clear blocker appears.
- Prefer importing generated TypeScript data instead of reading Excel at runtime.

Implementation approach:
- Generate a site-ready catalog data file from the workbook with a repeatable script.
- Update seed logic to seed the database from that generated real catalog instead of the current demo arrays.
- Update the homepage hero to derive slides from the seeded product records instead of old hard-coded sample products.
- Add tests proving the seeded catalog now contains real products and excludes old demo products.
