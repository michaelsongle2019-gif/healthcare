import Link from "next/link";
import { ensureLocale, copy } from "@/lib/locales";
import {
  canDirectDownload,
  getLocalizedValue,
  isProtectedDocument
} from "@/lib/content";
import { listDocuments } from "@/lib/repository";
import { submitDocumentRequestAction } from "@/app/actions/public";

export default async function DocumentsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);
  const dictionary = copy[locale];
  const { status } = await searchParams;
  const documents = listDocuments();

  return (
    <section className="page-section">
      <div className="content-card">
        <div className="eyebrow">{dictionary.labels.documentCenter}</div>
        <h1 className="page-title">{dictionary.nav.documents}</h1>
        <p className="section-copy">
          {locale === "zh"
            ? "公开资料可直接查看或下载，受控资料需先提交申请，便于销售团队按区域和项目进行跟进。"
            : "Public brochures are immediately available, while controlled packs are requested first to support compliant commercial follow-up."}
        </p>
      </div>

      {status === "success" ? (
        <div className="page-section">
          <div className="status-banner">{dictionary.labels.requestSuccess}</div>
        </div>
      ) : null}

      <div className="page-section card-grid">
        {documents.map((document) => (
          <article key={String(document.id)} className="content-card">
            <div className="small">
              {isProtectedDocument({
                accessLevel: document.accessLevel as "public" | "request"
              })
                ? dictionary.labels.protectedAccess
                : dictionary.labels.publicAccess}
            </div>
            <h3>
              {getLocalizedValue(
                locale,
                String(document.titleZh),
                String(document.titleEn)
              )}
            </h3>
            <p className="card-copy">
              {getLocalizedValue(
                locale,
                String(document.descriptionZh),
                String(document.descriptionEn)
              )}
            </p>
            {canDirectDownload({
              accessLevel: document.accessLevel as "public" | "request",
              filePath: String(document.filePath || "")
            }) ? (
              <Link
                className="button"
                href={String(document.filePath)}
                target="_blank"
                rel="noreferrer"
              >
                {dictionary.cta.download}
              </Link>
            ) : (
              <form action={submitDocumentRequestAction} className="admin-form">
                <input type="hidden" name="locale" value={locale} />
                <input
                  type="hidden"
                  name="documentId"
                  value={String(document.id)}
                />
                <label>
                  {locale === "zh" ? "公司名称" : "Company"}
                  <input name="company" required />
                </label>
                <label>
                  {locale === "zh" ? "联系人" : "Name"}
                  <input name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <label>
                  {locale === "zh" ? "电话" : "Phone"}
                  <input name="phone" required />
                </label>
                <label>
                  {locale === "zh" ? "申请说明" : "Message"}
                  <textarea name="message" required />
                </label>
                <button type="submit">{dictionary.cta.request}</button>
              </form>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
