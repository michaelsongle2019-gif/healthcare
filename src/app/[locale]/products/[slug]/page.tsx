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
  getCatalogBenchmark,
  getProductShowcase,
  getShowcaseFallbackProduct
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
  const product = findProductBySlug(slug) ?? getShowcaseFallbackProduct(slug);

  if (!product) {
    notFound();
  }

  const showcase = getProductShowcase(slug);
  const benchmark = showcase?.benchmark ?? getCatalogBenchmark(slug);
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

  const labels =
    locale === "zh"
      ? {
          useEyebrow: "适用场景",
          useTitle: dictionary.labels.useScenarios,
          specEyebrow: dictionary.labels.keySpecifications,
          specTitle: showcase?.specRows.length
            ? "详细技术参数"
            : dictionary.labels.keySpecifications,
          complianceEyebrow: "合规与交付信息",
          complianceTitle: "注册与交付信息",
          sourcesEyebrow: "官方来源与资料",
          sourcesTitle: "官网来源入口",
          relatedEyebrow: dictionary.labels.relatedProducts,
          englishNameLabel: "正式英文名",
          modelLabel: "型号",
          categoryLabel: "产品分类",
          sourceLabel: "资料来源",
          sourceValue: "基于公开官方资料整理",
          galleryEyebrow: "设备图集",
          galleryTitle: "更多设备视角",
          highlightsEyebrow: "核心功能",
          highlightsTitle: "公开资料要点整理",
          benchmarkTableTitle: "参数与功能对比",
          benchmarkItemLabel: "对比项",
          benchmarkOurLabel: "",
          benchmarkPeerLabel: "",
          viewSourceLabel: "查看来源"
        }
      : {
          useEyebrow: "Applications",
          useTitle: dictionary.labels.useScenarios,
          specEyebrow: "Public Specifications",
          specTitle: showcase?.specRows.length
            ? "Technical Specifications"
            : dictionary.labels.keySpecifications,
          complianceEyebrow: "Registration",
          complianceTitle: "Regulatory & Commercial Notes",
          sourcesEyebrow: "Official Sources",
          sourcesTitle: "Official Reference Links",
          relatedEyebrow: "Same Category",
          englishNameLabel: "English Product Name",
          modelLabel: "Model",
          categoryLabel: "Category",
          sourceLabel: "Source Reference",
          sourceValue: "Compiled from public official materials",
          galleryEyebrow: "Product Gallery",
          galleryTitle: "More Product Views",
          highlightsEyebrow: "Key Highlights",
          highlightsTitle: "Structured Public Highlights",
          benchmarkTableTitle: "Specification comparison",
          benchmarkItemLabel: "Item",
          benchmarkOurLabel: "",
          benchmarkPeerLabel: "",
          viewSourceLabel: "View source"
        };

  const benchmarkOurLabel =
    benchmark
      ? locale === "zh"
        ? benchmark.ourLabelZh
        : benchmark.ourLabelEn
      : labels.benchmarkOurLabel;

  const benchmarkPeerLabel =
    benchmark
      ? locale === "zh"
        ? benchmark.benchmarkLabelZh
        : benchmark.benchmarkLabelEn
      : labels.benchmarkPeerLabel;

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
            <div className="detail-meta-grid">
              <div className="meta-tile">
                <div className="small">{labels.englishNameLabel}</div>
                <strong>{englishProductName}</strong>
              </div>
              <div className="meta-tile">
                <div className="small">{labels.modelLabel}</div>
                <strong>{localizedModelLabel}</strong>
              </div>
              <div className="meta-tile">
                <div className="small">{labels.categoryLabel}</div>
                <strong>
                  {getLocalizedValue(
                    locale,
                    String(product.categoryNameZh),
                    String(product.categoryNameEn)
                  )}
                </strong>
              </div>
              <div className="meta-tile">
                <div className="small">{labels.sourceLabel}</div>
                <strong>{labels.sourceValue}</strong>
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
              <div className="eyebrow">{labels.galleryEyebrow}</div>
              <h2 className="section-title">{labels.galleryTitle}</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map((imageUrl) => (
              <div key={imageUrl} className="content-card gallery-card">
                <img src={imageUrl} alt={englishProductName} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {showcase?.featureBlocks.length ? (
        <div className="page-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{labels.highlightsEyebrow}</div>
              <h2 className="section-title">{labels.highlightsTitle}</h2>
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
          <div className="eyebrow">{labels.useEyebrow}</div>
          <h2 className="section-title">{labels.useTitle}</h2>
          <ul className="spec-list">
            {applicationPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="content-card detail-stack">
          <div className="eyebrow">{labels.specEyebrow}</div>
          <h2 className="section-title">{labels.specTitle}</h2>
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

      {benchmark ? (
        <div className="page-section">
          <div className="content-card detail-stack">
            <div className="eyebrow">
              {locale === "zh" ? benchmark.eyebrowZh : benchmark.eyebrowEn}
            </div>
            <h2 className="section-title">
              {locale === "zh" ? benchmark.titleZh : benchmark.titleEn}
            </h2>
            <p className="section-copy">
              {locale === "zh"
                ? benchmark.publicSummaryZh
                : benchmark.publicSummaryEn}
            </p>
            <div className="detail-stack">
              <h3>{labels.benchmarkTableTitle}</h3>
              <div className="comparison-table">
                <div className="comparison-table-row comparison-table-head">
                  <div className="comparison-table-cell comparison-table-label">
                    {labels.benchmarkItemLabel}
                  </div>
                  <div className="comparison-table-cell comparison-table-value">
                    {benchmarkOurLabel}
                  </div>
                  <div className="comparison-table-cell comparison-table-value">
                    {benchmarkPeerLabel}
                  </div>
                </div>
                {benchmark.comparisonRows.map((row) => (
                  <div key={row.labelEn} className="comparison-table-row">
                    <div className="comparison-table-cell comparison-table-label">
                      {locale === "zh" ? row.labelZh : row.labelEn}
                    </div>
                    <div className="comparison-table-cell comparison-table-value">
                      {locale === "zh" ? row.ourValueZh : row.ourValueEn}
                    </div>
                    <div className="comparison-table-cell comparison-table-value">
                      {locale === "zh"
                        ? row.benchmarkValueZh
                        : row.benchmarkValueEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="page-section two-grid">
        <div className="content-card detail-stack">
          <div className="eyebrow">{labels.complianceEyebrow}</div>
          <h2 className="section-title">{labels.complianceTitle}</h2>
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
          <div className="eyebrow">{labels.sourcesEyebrow}</div>
          <h2 className="section-title">{labels.sourcesTitle}</h2>
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
                      ? labels.viewSourceLabel
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
          <div className="eyebrow">{labels.relatedEyebrow}</div>
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
