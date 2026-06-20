import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import {
  getCatalogCardSummary,
  getLocalizedValue,
  truncateDisplayText
} from "@/lib/content";
import { copy, ensureLocale } from "@/lib/locales";
import { listCategories, listProducts } from "@/lib/repository";

export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);
  const dictionary = copy[locale];
  const filters = await searchParams;
  const categories = listCategories();
  const products = listProducts().filter((product) => {
    const matchesCategory =
      !filters.category || String(product.categorySlug) === filters.category;
    const keyword = (filters.q || "").toLowerCase();
    const haystack = [
      String(product.nameZh),
      String(product.nameEn),
      String(product.manufacturerZh),
      String(product.manufacturerEn),
      String(product.model)
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!keyword || haystack.includes(keyword));
  });

  return (
    <section className="page-section">
      <div className="content-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{dictionary.labels.productCenter}</div>
            <h1 className="page-title">{dictionary.nav.products}</h1>
          </div>
          <p className="section-copy compact-copy">
            {dictionary.labels.portfolioSummary}
          </p>
        </div>

        <form className="filter-row product-filter-row">
          <input
            type="text"
            name="q"
            defaultValue={filters.q}
            placeholder={dictionary.labels.search}
          />
          <select name="category" defaultValue={filters.category || ""}>
            <option value="">{dictionary.labels.allCategories}</option>
            {categories.map((category) => (
              <option key={String(category.id)} value={String(category.slug)}>
                {getLocalizedValue(
                  locale,
                  String(category.nameZh),
                  String(category.nameEn)
                )}
              </option>
            ))}
          </select>
          <button type="submit">{dictionary.cta.products}</button>
        </form>

        <div className="result-bar small">
          {locale === "zh"
            ? `${dictionary.labels.matchedProducts}：${products.length}`
            : `${dictionary.labels.matchedProducts}: ${products.length}`}
        </div>
      </div>

      <div className="page-section card-grid">
        {products.map((product) => {
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
                  {getLocalizedValue(
                    locale,
                    String(product.categoryNameZh),
                    String(product.categoryNameEn)
                  )}
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
              <p className="card-copy">
                {intro.text}{" "}
                <Link
                  href={`/${locale}/products/${String(product.slug)}`}
                  className="more-link"
                >
                  more
                </Link>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
