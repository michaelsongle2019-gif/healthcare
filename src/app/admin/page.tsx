import { createBackupAction } from "@/app/admin/actions";
import {
  listCategories,
  listDocuments,
  listInquiries,
  listProducts
} from "@/lib/repository";
import { AdminPage } from "@/components/admin-page";

export default async function AdminOverviewPage() {
  const categories = listCategories();
  const products = listProducts();
  const documents = listDocuments();
  const inquiries = listInquiries();

  return (
    <AdminPage>
      <div className="admin-grid">
        <section className="admin-panel">
          <div className="eyebrow">概览</div>
          <h1 className="page-title">内容统计</h1>
          <div className="three-grid">
            <div className="metric-card">
              <strong>{categories.length}</strong>
              <div className="small">产品分类</div>
            </div>
            <div className="metric-card">
              <strong>{products.length}</strong>
              <div className="small">产品数量</div>
            </div>
            <div className="metric-card">
              <strong>{documents.length}</strong>
              <div className="small">资料数量</div>
            </div>
            <div className="metric-card">
              <strong>{inquiries.length}</strong>
              <div className="small">询盘线索</div>
            </div>
          </div>
        </section>
        <section className="admin-panel">
          <div className="eyebrow">维护</div>
          <h2 className="admin-title">备份数据库</h2>
          <p className="section-copy">
            在进行批量更新前，可以先生成一份带时间戳的数据库备份文件。
          </p>
          <form action={createBackupAction}>
            <button type="submit">立即备份</button>
          </form>
        </section>
      </div>
    </AdminPage>
  );
}
