import { notFound } from "next/navigation";
import { ensureLocale, isLocale } from "@/lib/locales";
import { getSiteSettings } from "@/lib/repository";
import { SiteChrome } from "@/components/site-chrome";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = ensureLocale(rawLocale);
  const settings = getSiteSettings();
  const companyName =
    locale === "zh" ? settings.companyNameZh : settings.companyNameEn;

  return <SiteChrome locale={locale} companyName={companyName}>{children}</SiteChrome>;
}
