# Surgical Catalog English Localization Design

## Goal

Professionally localize all surgical-pack catalog content on the bilingual website so that switching to English displays complete, natural, medically appropriate English for all 24 newly added products.

## Scope

The localization covers:

- 16 products in `surgical-procedure-packs`
- 8 products in `operating-room-consumables`
- English product names
- English summaries
- English applications
- English specifications and pack contents
- English packaging information
- English manufacturer-status wording
- English SEO titles and descriptions
- English category names and labels used by the catalog and detail pages

Chinese content, existing product slugs, category assignments, image paths, and URLs remain unchanged.

## Authoritative Source

`D:/HealthCare/Surgical_Pack_Consumables_Professionally_Reviewed_0715.xlsx` is the authoritative source for the 16 surgical-pack English names and component lists.

For each pack:

- The website product name must match the reviewed English pack name.
- The number and order of components must match the workbook.
- Dimensions, units, ply counts, sizes, and capacities must match the workbook.
- Website punctuation may be normalized for consistency, but the medical meaning must not change.
- A missing unit may only be supplied when the corresponding Chinese source clearly establishes it.

The 8 operating-room consumable families are derived from the same reviewed component terminology. Their specifications may consolidate multiple workbook entries into a product-family specification list.

## Approved Terminology

Use the following terms consistently:

| Concept | Approved English |
|---|---|
| 量碗 | Graduated bowl |
| 量杯 | Graduated cup |
| 塑料弯盘 | Plastic kidney basin |
| 器械台套 | Mayo stand cover |
| 包布 | Sterilization wrap |
| 后桌罩、器械包布 | Back table cover |
| 手术洞巾 | Fenestrated drape |
| 边单 | Side drape |
| U 型单 | U-drape |
| 腿套（弹力筒状） | Stockinette |
| 妇产科腿套 | Leggings |
| 无菌保护罩 | Disposable sterile equipment cover |
| 长筒设备保护罩 | Disposable sterile equipment sleeve |
| 脱脂纱布块 | Absorbent gauze swab |
| 护理垫单 | Absorbent underpad |
| 加强型手术衣 | Reinforced surgical gown |

Avoid non-specialist substitutions such as `measuring bowl`, `instrument tray cover`, or `kidney tray` when the approved term above applies.

## English Editorial Standard

### Product names

Use title case and the reviewed pack names. Do not add unsupported claims such as `Premium`, `Advanced`, or `FDA Approved`.

### Summaries

Use one concise sentence:

`Disposable sterile procedure pack configured for [procedure]; contents can be customized to project requirements.`

For standalone consumables:

`[Product function]; available specifications can be configured to project requirements.`

### Applications

Use a short clinical noun phrase, not a sales sentence. Examples:

- `Angiography and vascular intervention`
- `Cataract surgery`
- `Dental implant procedures`
- `Dilation and curettage procedures`

### Specifications

- Surgical packs use a numbered component list.
- Standalone product families use a concise specification list.
- Use `×` between dimensions.
- Use a space between values and units: `500 mL`, `125 mm`, `45 g/m²`.
- Use `8-ply`, `2-ply`, and `size 7.5`.
- Preserve repeated components when the reviewed workbook lists them more than once.

### Packaging

Surgical packs:

`Individually sterile packed; carton configuration and sterilization method are available on request.`

Standalone consumables:

`Individually packed or supplied as a procedure-pack component; sterility and carton configuration are available on request.`

These statements avoid implying a specific sterilization method or carton quantity that has not been confirmed.

### Manufacturer status

Replace the public-facing placeholder `Supplier to be confirmed` with:

`Manufacturer information available on request`

This is truthful, professional, and does not invent a supplier or manufacturer.

### SEO

- Title: exact English product name.
- Description: one natural sentence mentioning the product or pack, available configuration, and intended procedure.
- Do not include regulatory, certification, performance, or country-of-origin claims without a source.

## Data Flow

The reviewed localization remains in `src/lib/surgical-pack-catalog.ts`.

The idempotent installer:

1. Reads the 16 pack and 8 consumable definitions.
2. Updates existing records by stable slug.
3. Preserves category IDs, slugs, image paths, and Chinese fields.
4. Writes the corrected English fields to the active SQLite database.
5. Can be rerun without creating duplicate categories or products.

The existing product list and detail pages continue selecting localized values based on the `/zh/` or `/en/` route.

## Validation

Automated tests must verify:

- Exactly 16 surgical packs and 8 operating-room consumable families are present.
- All 24 products contain non-empty English name, summary, application, specifications, packaging, SEO title, and SEO description.
- No English field contains Chinese characters or `EN pending`.
- Every surgical pack name matches the reviewed workbook.
- Every surgical pack component count and order matches the reviewed workbook.
- Required professional terms, including `Graduated bowl, 500 mL`, are preserved.
- Reinstalling the catalog remains idempotent.

Runtime verification must confirm:

- `/en/products?category=surgical-procedure-packs` returns HTTP 200.
- `/en/products?category=operating-room-consumables` returns HTTP 200.
- Representative English detail pages return HTTP 200.
- The rendered English pages contain no Chinese characters or `EN pending`.
- The English language switch leads to the corresponding `/en/` page.

## Non-Goals

- No changes to the reviewed Excel workbook.
- No new product categories.
- No changes to Chinese product content.
- No manufacturer, regulatory, certification, sterility-method, or performance claims beyond available source material.
- No changes to product images or existing URLs.

