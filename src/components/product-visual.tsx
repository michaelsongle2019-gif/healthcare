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

  if (imageUrl) {
    return (
      <div className="product-visual-frame">
        <Image
          src={imageUrl}
          alt={String(
            getLocalizedValue(locale, String(product.nameZh), String(product.nameEn))
          )}
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
        <strong>{String(product.model)}</strong>
        <span>{locale === "zh" ? "官方图片待补充" : "Official image pending"}</span>
      </div>
    </div>
  );
}
