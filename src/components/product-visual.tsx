import Image from "next/image";
import { getLocalizedValue } from "@/lib/content";
import type { Locale } from "@/lib/locales";

type ProductLike = {
  imageUrl: unknown;
  manufacturerZh: unknown;
  manufacturerEn: unknown;
  model: unknown;
  nameZh: unknown;
  nameEn: unknown;
};

export function ProductVisual({
  locale,
  product,
  width,
  height
}: {
  locale: Locale;
  product: ProductLike;
  width: number;
  height: number;
}) {
  const imageUrl = String(product.imageUrl || "").trim();
  const localizedProductName = getLocalizedValue(
    locale,
    String(product.nameZh),
    String(product.nameEn)
  );
  const localizedModelLabel =
    locale === "en" && String(product.nameEn || "").trim()
      ? String(product.nameEn)
      : String(product.model);

  if (imageUrl) {
    return (
      <div className="product-visual-frame">
        <Image
          src={imageUrl}
          alt={String(localizedProductName)}
          width={width}
          height={height}
          className="product-visual-image"
        />
      </div>
    );
  }

  return (
    <div className="product-placeholder product-visual-frame" aria-label="Official image pending">
      <div className="product-placeholder-inner">
        <div className="small">
          {getLocalizedValue(
            locale,
            String(product.manufacturerZh),
            String(product.manufacturerEn)
          )}
        </div>
        <strong>{localizedModelLabel}</strong>
        <span>{locale === "zh" ? "官方图片待补充" : "Official image pending"}</span>
      </div>
    </div>
  );
}
