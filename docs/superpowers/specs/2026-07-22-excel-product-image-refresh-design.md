# Excel Product Image Refresh Design

## Goal

Replace the 48 newly imported Excel product images on the local healthcare site with clearer, more uniform images so the new products visually match the existing 27 website products more closely.

## Scope

- Only update the 48 imported products whose slugs start with `excel-`.
- Keep the existing product taxonomy, text content, and category mapping unchanged.
- Apply changes to the local site first. No production deployment is included in this step.

## Approach Options Considered

### Option 1: Per-product replacement images

Generate or source one clearer representative image for each of the 48 imported products, then update each product record to use the new image.

- Pros: best visual quality, strongest product recognition, closest to the existing site cards.
- Cons: most work.

### Option 2: Shared image per subcategory

Reuse one high-quality image across multiple similar products within the same subcategory.

- Pros: fastest way to improve consistency.
- Cons: weaker product-level distinction.

### Option 3: Keep source images and only restyle cards

Preserve the current Excel-derived images and adjust cropping, framing, and front-end presentation only.

- Pros: lowest implementation effort.
- Cons: does not solve the core clarity problem.

## Selected Approach

Use Option 1.

Execution rules:

- Consumables should use a clean white-background product-photo style.
- Devices should use a clean white-background equipment-photo style.
- Final images should feel consistent in framing, scale, and clarity with the existing 27 products.
- Images should be saved as local project assets and referenced directly by the local database.

## Implementation Outline

1. Read the current list of imported `excel-` products from the local database.
2. Generate or prepare one replacement image for each imported product.
3. Save the final images into a dedicated local folder for the refreshed assets.
4. Update the database image paths for the 48 imported products only.
5. Verify that the product list page and representative detail pages render the new images correctly on the local site.

## Asset Rules

- Use landscape card-friendly images that still read well when cropped responsively.
- Prefer centered subjects with generous visual padding.
- Avoid text overlays, watermarks, busy backgrounds, and collage layouts.
- Avoid mixing inconsistent illustration styles with photographic styles.

## Validation

The work is considered complete when all of the following are true:

- The local database still contains 75 products in total.
- The 48 imported `excel-` products point to the new refreshed image directory.
- The local `/zh/products` page visibly shows the refreshed images.
- Sample checks across both consumables and devices confirm that images are clear and fill the cards cleanly.

## Non-Goals

- No change to category structure.
- No change to product copy beyond image references.
- No production release or publishing in this step.
