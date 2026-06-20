import Link from "next/link";
import { copy, localeNames, type Locale } from "@/lib/locales";

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

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link href={`/${locale}`} className="brand-block">
            <span className="brand-mark">{companyName}</span>
            <span className="brand-caption">
              {locale === "zh"
                ? "医疗器械与医用耗材展示平台"
                : "medical devices and consumables"}
            </span>
          </Link>
          <nav className="site-nav">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="nav-link"
              >
                {dictionary.nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className="locale-switch">
            {(["en", "zh"] as const).map((targetLocale) => (
              <Link
                key={targetLocale}
                href={`/${targetLocale}`}
                className={targetLocale === locale ? "active" : ""}
              >
                {localeNames[targetLocale]}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="admin-entry"
              aria-label={dictionary.nav.admin}
              title={dictionary.nav.admin}
            >
              管理
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="footer-inner small">
          <div>{companyName}</div>
          <div>
            {locale === "zh"
              ? "双语产品展示、资料下载与后台维护。"
              : "Bilingual product catalog, document center, and admin console."}
          </div>
        </div>
      </footer>
    </div>
  );
}
