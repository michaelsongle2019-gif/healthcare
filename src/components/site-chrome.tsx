import Link from "next/link";
import { copy, type Locale } from "@/lib/locales";
import { LocaleSwitch } from "@/components/locale-switch";
import { isDocumentCenterVisible } from "@/lib/public-features";

type SiteChromeProps = {
  locale: Locale;
  companyName: string;
  children: React.ReactNode;
};

const navItems = [
  { key: "home", href: "" },
  { key: "products", href: "/products" },
  { key: "documents", href: "/documents" },
  { key: "contact", href: "/contact" }
] as const;

export function SiteChrome({ locale, companyName, children }: SiteChromeProps) {
  const dictionary = copy[locale];
  const showDocumentCenter = isDocumentCenterVisible();
  const visibleNavItems = showDocumentCenter
    ? navItems
    : navItems.filter((item) => item.key !== "documents");

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link href={`/${locale}`} className="brand-block">
            <span
              className={
                locale === "zh" ? "brand-mark brand-mark-zh" : "brand-mark brand-mark-en"
              }
            >
              {companyName}
            </span>
            <span className="brand-caption">
              {locale === "zh"
                ? "医疗器械与医用耗材展示平台"
                : "Bilingual portfolio of medical devices and consumables"}
            </span>
          </Link>
          <nav className="site-nav">
            {visibleNavItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="nav-link"
              >
                {dictionary.nav[item.key]}
              </Link>
            ))}
          </nav>
          <LocaleSwitch locale={locale} adminLabel={dictionary.nav.admin} />
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="footer-inner small">
          <div>{companyName}</div>
          <div>
            {locale === "zh"
              ? "双语产品展示、资料下载与后台维护。"
              : "Bilingual product portfolio, document center, and administration console."}
          </div>
        </div>
      </footer>
    </div>
  );
}
