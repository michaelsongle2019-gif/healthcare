import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import {
  buildVisibleCatalogStructure,
  getCategoryDisplayNames
} from "@/lib/catalog-taxonomy";
import {
  getCatalogCardSummary,
  getLocalizedValue,
  truncateDisplayText
} from "@/lib/content";
import { copy, ensureLocale } from "@/lib/locales";
import { listProducts } from "@/lib/repository";

export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topCategory?: string; category?: string; q?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);
  const dictionary = copy[locale];
  const filters = await searchParams;
  const allProducts = listProducts();
  const visibleStructure = buildVisibleCatalogStructure(allProducts);
  const derivedTopCategory = filters.category
    ? getCategoryDisplayNames(filters.category).topLevelSlug
    : "";
  const activeTopCategory = String(filters.topCategory || derivedTopCategory || "");
  const activeSubcategories = activeTopCategory
    ? visibleStructure.find((entry) => entry.slug === activeTopCategory)?.children ?? []
    : visibleStructure.flatMap((entry) => entry.children);
  const products = allProducts.filter((product) => {
    const categoryNames = getCategoryDisplayNames(String(product.categorySlug || ""));
    const matchesTopCategory =
      !activeTopCategory || categoryNames.topLevelSlug === activeTopCategory;
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

    return matchesTopCategory && matchesCategory && (!keyword || haystack.includes(keyword));
  });

  return (
    <section className="page-section">
      <div className="content-card product-center-header">
        <h1 className="page-title">{dictionary.nav.products}</h1>
        <div className="catalog-quick-groups">
          {visibleStructure.map((group) => (
            <Link
              key={group.slug}
              href={`/${locale}/products?topCategory=${group.slug}`}
              className={`catalog-group-pill${
                activeTopCategory === group.slug ? " active" : ""
              }`}
            >
              <strong>{locale === "zh" ? group.nameZh : group.nameEn}</strong>
              <span>
                {locale === "zh"
                  ? `${group.children.reduce((sum, child) => sum + child.products.length, 0)} 个产品`
                  : `${group.children.reduce((sum, child) => sum + child.products.length, 0)} items`}
              </span>
            </Link>
          ))}
        </div>
        {activeSubcategories.length > 0 ? (
          <div className="catalog-subcategory-row">
            {activeSubcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/${locale}/products?topCategory=${subcategory.topLevelSlug}&category=${subcategory.slug}`}
                className={`category-chip${
                  filters.category === subcategory.slug ? " active" : ""
                }`}
              >
                {locale === "zh" ? subcategory.nameZh : subcategory.nameEn}
              </Link>
            ))}
          </div>
        ) : null}
        <form className="filter-row product-filter-row">
          <input
            type="text"
            name="q"
            defaultValue={filters.q}
            placeholder={dictionary.labels.search}
          />
          <select name="topCategory" defaultValue={activeTopCategory}>
            <option value="">
              {locale === "zh" ? "全部一级分类" : "All top-level categories"}
            </option>
            {visibleStructure.map((group) => (
              <option key={group.slug} value={group.slug}>
                {locale === "zh" ? group.nameZh : group.nameEn}
              </option>
            ))}
          </select>
          <select name="category" defaultValue={filters.category || ""}>
            <option value="">{dictionary.labels.allCategories}</option>
            {activeTopCategory
              ? activeSubcategories.map((subcategory) => (
                  <option key={subcategory.slug} value={subcategory.slug}>
                    {locale === "zh" ? subcategory.nameZh : subcategory.nameEn}
                  </option>
                ))
              : visibleStructure.map((group) => (
                  <optgroup
                    key={group.slug}
                    label={locale === "zh" ? group.nameZh : group.nameEn}
                  >
                    {group.children.map((subcategory) => (
                      <option key={subcategory.slug} value={subcategory.slug}>
                        {locale === "zh" ? subcategory.nameZh : subcategory.nameEn}
                      </option>
                    ))}
                  </optgroup>
                ))}
          </select>
          <button type="submit">{dictionary.cta.products}</button>
        </form>

        <div className="result-bar small">
          {locale === "zh"
            ? `当前匹配产品: ${products.length}`
            : `${dictionary.labels.matchedProducts}: ${products.length}`}
        </div>
      </div>

      <div className="card-grid product-results-grid">
        {products.map((product) => {
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
  );
}
