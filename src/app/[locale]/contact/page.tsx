import { ensureLocale, copy } from "@/lib/locales";
import { getLocalizedValue } from "@/lib/content";
import { getSiteSettings } from "@/lib/repository";
import { submitInquiryAction } from "@/app/actions/public";

export default async function ContactPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);
  const dictionary = copy[locale];
  const settings = getSiteSettings();
  const { status } = await searchParams;

  return (
    <section className="page-section">
      <div className="two-grid">
        <div className="content-card">
          <div className="eyebrow">{dictionary.labels.contactUs}</div>
          <h1 className="page-title">{dictionary.nav.contact}</h1>
          <p className="section-copy">
            {getLocalizedValue(locale, settings.addressZh, settings.addressEn)}
          </p>
          <p className="section-copy">
            {settings.phone}
            <br />
            {settings.email}
          </p>
        </div>
        <div className="content-card">
          {status === "success" ? (
            <div className="status-banner">{dictionary.labels.inquirySuccess}</div>
          ) : null}
          <form action={submitInquiryAction} className="admin-form">
            <input type="hidden" name="locale" value={locale} />
            <label>
              {locale === "zh" ? "联系人" : "Name"}
              <input name="name" required />
            </label>
            <label>
              {locale === "zh" ? "公司名称" : "Company"}
              <input name="company" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              {locale === "zh" ? "联系电话" : "Phone"}
              <input name="phone" required />
            </label>
            <label>
              {locale === "zh" ? "国家/地区" : "Country / Region"}
              <input name="country" required />
            </label>
            <label>
              {locale === "zh" ? "询盘内容" : "Inquiry details"}
              <textarea name="message" required />
            </label>
            <button type="submit">{dictionary.cta.send}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
