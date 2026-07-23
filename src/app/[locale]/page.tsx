import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import {
  buildVisibleCatalogStructure,
  getCategoryDisplayNames
} from "@/lib/catalog-taxonomy";
import {
  getCatalogCardSummary,
  getHomepageHeroSummary,
  getLocalizedValue,
  truncateDisplayText
} from "@/lib/content";
import { copy, ensureLocale } from "@/lib/locales";
import { listProducts } from "@/lib/repository";

function hasDirectImage(value: unknown) {
  const url = String(value || "").trim().toLowerCase();
  return (
    url.startsWith("http") &&
    [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].some(
      (extension) => url.endsWith(extension) || url.includes(`${extension}?`)
    )
  );
}

export default async function LocaleHomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);
  const dictionary = copy[locale];
  const products = listProducts();
  const visibleStructure = buildVisibleCatalogStructure(products);
  const featuredProducts = products.slice(0, 6);
  const heroProducts = products
    .filter((product) => hasDirectImage(product.imageUrl))
    .slice(0, 3);

  return (
    <>
      <section className="page-section home-hero-section">
        <div className="home-hero">
          <div className="home-hero-slides">
            {heroProducts.map((product, index) => (
              <article
                key={String(product.id)}
                className="home-hero-slide"
                style={{ animationDelay: `${index * 6}s` }}
              >
                <div className="home-hero-copy">
                  <div className="eyebrow">
                    {getLocalizedValue(
                      locale,
                      String(product.categoryNameZh),
                      String(product.categoryNameEn)
                    )}
                  </div>
                  <h1 className="hero-title">
                    {getLocalizedValue(
                      locale,
                      String(product.nameZh),
                      String(product.nameEn)
                    )}
                  </h1>
                  <p className="hero-copy">
                    {
                      truncateDisplayText(
                        getHomepageHeroSummary(locale, {
                          applicationZh: String(product.applicationZh),
                          applicationEn: String(product.applicationEn),
                          specificationsZh: String(product.specificationsZh),
                          specificationsEn: String(product.specificationsEn),
                          summaryZh: String(product.summaryZh),
                          summaryEn: String(product.summaryEn)
                        }),
                        140
                      ).text
                    }
                  </p>
                  <div className="cta-row">
                    <Link
                      href={`/${locale}/products/${String(product.slug)}`}
                      className="button"
                    >
                      {locale === "zh" ? "查看产品详情" : "View Product Details"}
                    </Link>
                    <Link href={`/${locale}/products`} className="button secondary">
                      {dictionary.cta.products}
                    </Link>
                  </div>
                </div>

                <div className="home-hero-media">
                  <img
                    src={String(product.imageUrl)}
                    alt={getLocalizedValue(
                      locale,
                      String(product.nameZh),
                      String(product.nameEn)
                    )}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section home-categories-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              {locale === "zh" ? "分类浏览" : "Browse Categories"}
            </div>
            <h2 className="section-title">
              {locale === "zh" ? "按大类与用途快速查找" : "Find products by type and use case"}
            </h2>
          </div>
          <Link href={`/${locale}/products`} className="pill-link">
            {locale === "zh" ? "查看全部产品" : "View all products"}
          </Link>
        </div>

        <div className="category-group-grid">
          {visibleStructure.map((group) => (
            <article key={group.slug} className="content-card category-group-card">
              <div className="category-group-header">
                <div>
                  <div className="eyebrow">
                    {locale === "zh" ? "一级分类" : "Top-level category"}
                  </div>
                  <h3>{locale === "zh" ? group.nameZh : group.nameEn}</h3>
                </div>
                <Link
                  href={`/${locale}/products?topCategory=${group.slug}`}
                  className="soft-pill"
                >
                  {locale === "zh"
                    ? `${group.children.reduce((sum, child) => sum + child.products.length, 0)} 个产品`
                    : `${group.children.reduce((sum, child) => sum + child.products.length, 0)} items`}
                </Link>
              </div>

              <div className="category-group-children">
                {group.children.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/${locale}/products?topCategory=${subcategory.topLevelSlug}&category=${subcategory.slug}`}
                    className="category-subcard"
                  >
                    <strong>
                      {locale === "zh" ? subcategory.nameZh : subcategory.nameEn}
                    </strong>
                    <span className="small">
                      {locale === "zh"
                        ? `${subcategory.products.length} 个产品`
                        : `${subcategory.products.length} items`}
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="card-grid">
          {featuredProducts.map((product) => {
            const categoryNames = getCategoryDisplayNames(String(product.categorySlug || ""));
            const intro = truncateDisplayText(
              getCatalogCardSummary(locale, {
                applicationZh: String(product.applicationZh),
                applicationEn: String(product.applicationEn),
                specificationsZh: String(product.specificationsZh),
                specificationsEn: String(product.specificationsEn),
                summaryZh: String(product.summaryZh),
                summaryEn: String(product.summaryEn)
              }),
              78
            );

            return (
              <article key={String(product.id)} className="content-card product-card">
                <ProductVisual locale={locale} product={product} width={900} height={640} />
                <div className="pill-row">
                  <span className="soft-pill">
                    {locale === "zh"
                      ? `${categoryNames.topLevelNameZh} / ${categoryNames.subcategoryNameZh}`
                      : `${categoryNames.topLevelNameEn} / ${categoryNames.subcategoryNameEn}`}
                  </span>
                </div>
                <h3>
                  <Link href={`/${locale}/products/${String(product.slug)}`}>
                    {getLocalizedValue(
                      locale,
                      String(product.nameZh),
                      String(product.nameEn)
                    )}
                  </Link>
                </h3>
                <div className="product-card-copy">
                  <p className="card-copy card-copy-text">{intro.text}</p>
                  <Link
                    href={`/${locale}/products/${String(product.slug)}`}
                    className="more-link"
                  >
                    {locale === "zh" ? "更多" : "Learn more"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
