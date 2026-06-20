import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductVisual } from "@/components/product-visual";
import {
  canDirectDownload,
  getLocalizedValue,
  getStructuredInfoRows,
  splitDisplayPoints
} from "@/lib/content";
import { copy, ensureLocale } from "@/lib/locales";
import {
  getFallbackGallery,
  getProductShowcase
} from "@/lib/product-showcase";
import { findProductBySlug, listDocuments, listProducts } from "@/lib/repository";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = ensureLocale(rawLocale);
  const dictionary = copy[locale];
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const showcase = getProductShowcase(slug);
  const documents = listDocuments().filter(
    (document) => String(document.productId || "") === String(product.id)
  );
  const relatedProducts = listProducts()
    .filter(
      (entry) =>
        String(entry.categoryId) === String(product.categoryId) &&
        String(entry.id) !== String(product.id)
    )
    .slice(0, 3);

  const applicationPoints = splitDisplayPoints(
    getLocalizedValue(
      locale,
      String(product.applicationZh),
      String(product.applicationEn)
    )
  );

  const specificationPoints = splitDisplayPoints(
    getLocalizedValue(
      locale,
      String(product.specificationsZh),
      String(product.specificationsEn)
    )
  );

  const packagingPoints = splitDisplayPoints(
    getLocalizedValue(
      locale,
      String(product.packagingZh),
      String(product.packagingEn)
    )
  );
  const packagingRows = getStructuredInfoRows(
    getLocalizedValue(
      locale,
      String(product.packagingZh),
      String(product.packagingEn)
    )
  );

  const gallery = showcase?.gallery.length
    ? showcase.gallery
    : getFallbackGallery(product);
  const englishProductName = getLocalizedValue(
    "en",
    String(product.nameZh),
    String(product.nameEn)
  );
  const localizedModelLabel =
    locale === "en" && String(product.nameEn || "").trim()
      ? String(product.nameEn)
      : String(product.model);

  return (
    <section className="page-section product-detail-page">
      <div className="product-feature-hero">
        <div className="product-feature-stage">
          <div className="product-feature-copy">
            <div className="eyebrow">
              {showcase
                ? locale === "zh"
                  ? showcase.heroLabelZh
                  : showcase.heroLabelEn
                : getLocalizedValue(
                    locale,
                    String(product.categoryNameZh),
                    String(product.categoryNameEn)
                  )}
            </div>
            <div className="small">
              {getLocalizedValue(
                locale,
                String(product.manufacturerZh),
                String(product.manufacturerEn)
              )}
            </div>
            <h1 className="page-title">
              {showcase
                ? locale === "zh"
                  ? showcase.heroTitleZh
                  : showcase.heroTitleEn
                : getLocalizedValue(
                    locale,
                    String(product.nameZh),
                    String(product.nameEn)
                  )}
            </h1>
            <p className="section-copy">
              {showcase
                ? locale === "zh"
                  ? showcase.heroBodyZh
                  : showcase.heroBodyEn
                : getLocalizedValue(
                    locale,
                    String(product.summaryZh),
                    String(product.summaryEn)
                  )}
            </p>
            <div className="detail-meta-grid">
              <div className="meta-tile">
                <div className="small">
                  {locale === "zh" ? "正式英文名" : "English Product Name"}
                </div>
                <strong>{englishProductName}</strong>
              </div>
              <div className="meta-tile">
                <div className="small">{locale === "zh" ? "型号" : "Model"}</div>
                <strong>{localizedModelLabel}</strong>
              </div>
              <div className="meta-tile">
                <div className="small">{locale === "zh" ? "产品分类" : "Category"}</div>
                <strong>
                  {getLocalizedValue(
                    locale,
                    String(product.categoryNameZh),
                    String(product.categoryNameEn)
                  )}
                </strong>
              </div>
              <div className="meta-tile">
                <div className="small">
                  {locale === "zh" ? "资料来源" : "Source Basis"}
                </div>
                <strong>
                  {locale === "zh"
                    ? "基于公开官方资料整理"
                    : "Adapted from public official materials"}
                </strong>
              </div>
            </div>
          </div>

          <div className="product-feature-media">
            <ProductVisual locale={locale} product={product} width={1400} height={960} />
          </div>
        </div>
      </div>

      {gallery.length > 1 ? (
        <div className="page-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                {locale === "zh" ? "设备图集" : "Product Gallery"}
              </div>
              <h2 className="section-title">
                {locale === "zh" ? "更多设备视角" : "More Product Views"}
              </h2>
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map((imageUrl) => (
              <div key={imageUrl} className="content-card gallery-card">
                <img
                  src={imageUrl}
                  alt={getLocalizedValue(
                    "en",
                    String(product.nameZh),
                    String(product.nameEn)
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {showcase?.featureBlocks.length ? (
        <div className="page-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                {locale === "zh" ? "核心功能" : "Core Highlights"}
              </div>
              <h2 className="section-title">
                {locale === "zh" ? "公开资料要点整理" : "Structured Public Highlights"}
              </h2>
            </div>
          </div>
          <div className="three-grid">
            {showcase.featureBlocks.map((block) => {
              const points =
                locale === "zh" ? block.pointsZh || [] : block.pointsEn || [];

              return (
                <article key={block.titleEn} className="content-card detail-stack">
                  <h3>{locale === "zh" ? block.titleZh : block.titleEn}</h3>
                  <p className="card-copy">
                    {locale === "zh" ? block.bodyZh : block.bodyEn}
                  </p>
                  {points.length ? (
                    <ul className="spec-list">
                      {points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="page-section two-grid">
        <div className="content-card detail-stack">
          <div className="eyebrow">{dictionary.labels.useScenarios}</div>
          <h2 className="section-title">{dictionary.labels.useScenarios}</h2>
          <ul className="spec-list">
            {applicationPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="content-card detail-stack">
          <div className="eyebrow">{dictionary.labels.keySpecifications}</div>
          <h2 className="section-title">
            {showcase?.specRows.length
              ? locale === "zh"
                ? "详细技术参数"
                : "Technical Specifications"
              : dictionary.labels.keySpecifications}
          </h2>
          {showcase?.specRows.length ? (
            <div className="spec-table">
              {showcase.specRows.map((row) => (
                <div key={row.labelEn} className="spec-table-row">
                  <div className="spec-table-label">
                    {locale === "zh" ? row.labelZh : row.labelEn}
                  </div>
                  <div className="spec-table-value">
                    {locale === "zh" ? row.valueZh : row.valueEn}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="spec-list">
              {specificationPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="page-section two-grid">
        <div className="content-card detail-stack">
          <div className="eyebrow">
            {locale === "zh" ? "合规与交付信息" : "Compliance & Delivery"}
          </div>
          <h2 className="section-title">
            {locale === "zh" ? "注册与交付信息" : "Registration & Delivery"}
          </h2>
          {packagingRows.length >= 2 ? (
            <div className="spec-table">
              {packagingRows.map((row) => (
                <div key={`${row.label}-${row.value}`} className="spec-table-row">
                  <div className="spec-table-label">{row.label}</div>
                  <div className="spec-table-value">{row.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="spec-list">
              {packagingPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="content-card detail-stack">
          <div className="eyebrow">
            {locale === "zh" ? "官方来源与资料" : "Official Sources & Documents"}
          </div>
          <h2 className="section-title">
            {locale === "zh" ? "官网来源入口" : "Official Source Entry"}
          </h2>
          <div className="document-stack">
            {documents.map((document) => {
              const directDownload = canDirectDownload({
                accessLevel: document.accessLevel as "public" | "request",
                filePath: String(document.filePath || "")
              });

              return (
                <div key={String(document.id)} className="document-row">
                  <div>
                    <strong>
                      {getLocalizedValue(
                        locale,
                        String(document.titleZh),
                        String(document.titleEn)
                      )}
                    </strong>
                    <p className="card-copy">
                      {getLocalizedValue(
                        locale,
                        String(document.descriptionZh),
                        String(document.descriptionEn)
                      )}
                    </p>
                  </div>
                  <Link
                    href={directDownload ? String(document.filePath) : `/${locale}/documents`}
                    className="pill-link"
                    target={directDownload ? "_blank" : undefined}
                    rel={directDownload ? "noreferrer" : undefined}
                  >
                    {document.accessLevel === "public"
                      ? locale === "zh"
                        ? "查看来源"
                        : "View source"
                      : dictionary.cta.request}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="page-section">
          <div className="eyebrow">{dictionary.labels.relatedProducts}</div>
          <h2 className="section-title">{dictionary.labels.relatedProducts}</h2>
          <div className="three-grid">
            {relatedProducts.map((entry) => (
              <div key={String(entry.id)} className="overview-card">
                <div className="small">
                  {getLocalizedValue(
                    locale,
                    String(entry.categoryNameZh),
                    String(entry.categoryNameEn)
                  )}
                </div>
                <h3>
                  <Link href={`/${locale}/products/${String(entry.slug)}`}>
                    {getLocalizedValue(
                      locale,
                      String(entry.nameZh),
                      String(entry.nameEn)
                    )}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
