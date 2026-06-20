import { saveNewsAction } from "@/app/admin/actions";
import { listNews } from "@/lib/repository";
import { AdminPage } from "@/components/admin-page";

function NewsForm({ article }: { article?: Record<string, unknown> }) {
  return (
    <form action={saveNewsAction} className="admin-form">
      {article?.id ? (
        <input type="hidden" name="id" value={String(article.id)} />
      ) : null}
      <label>
        Slug
        <input name="slug" defaultValue={String(article?.slug ?? "")} />
      </label>
      <label>
        中文标题
        <input name="titleZh" defaultValue={String(article?.titleZh ?? "")} />
      </label>
      <label>
        英文标题
        <input name="titleEn" defaultValue={String(article?.titleEn ?? "")} />
      </label>
      <label>
        中文摘要
        <textarea
          name="summaryZh"
          defaultValue={String(article?.summaryZh ?? "")}
        />
      </label>
      <label>
        英文摘要
        <textarea
          name="summaryEn"
          defaultValue={String(article?.summaryEn ?? "")}
        />
      </label>
      <label>
        中文正文
        <textarea
          name="contentZh"
          defaultValue={String(article?.contentZh ?? "")}
        />
      </label>
      <label>
        英文正文
        <textarea
          name="contentEn"
          defaultValue={String(article?.contentEn ?? "")}
        />
      </label>
      <label>
        发布时间
        <input
          name="publishedAt"
          type="date"
          defaultValue={String(article?.publishedAt ?? "")}
        />
      </label>
      <label>
        <input
          type="checkbox"
          name="featured"
          defaultChecked={Boolean(article?.featured)}
        />{" "}
        设为推荐
      </label>
      <button type="submit">{article ? "保存新闻" : "新增新闻"}</button>
    </form>
  );
}

export default async function AdminNewsPage() {
  const articles = listNews();

  return (
    <AdminPage>
      <section className="admin-panel">
        <div className="eyebrow">新闻管理</div>
        <h1 className="page-title">新闻内容维护</h1>
        <div className="admin-grid">
          {articles.map((article) => (
            <NewsForm
              key={String(article.id)}
              article={article as Record<string, unknown>}
            />
          ))}
          <NewsForm />
        </div>
      </section>
    </AdminPage>
  );
}
