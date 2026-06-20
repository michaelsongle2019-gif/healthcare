import {
  listAuditLogs,
  listDocumentRequests,
  listInquiries
} from "@/lib/repository";
import { AdminPage } from "@/components/admin-page";

export default async function AdminLeadsPage() {
  const documentRequests = listDocumentRequests();
  const inquiries = listInquiries();
  const logs = listAuditLogs();

  return (
    <AdminPage>
      <div className="admin-grid">
        <section className="table-card">
          <div className="eyebrow">资料申请</div>
          <table>
            <thead>
              <tr>
                <th>资料</th>
                <th>公司</th>
                <th>联系人</th>
                <th>提交时间</th>
              </tr>
            </thead>
            <tbody>
              {documentRequests.map((request) => (
                <tr key={String(request.id)}>
                  <td>{String(request.documentTitleZh || request.documentTitleEn)}</td>
                  <td>{String(request.company)}</td>
                  <td>
                    {String(request.name)}
                    <br />
                    {String(request.email)}
                  </td>
                  <td>{String(request.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="table-card">
          <div className="eyebrow">询盘线索</div>
          <table>
            <thead>
              <tr>
                <th>公司</th>
                <th>联系人</th>
                <th>国家/地区</th>
                <th>提交时间</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
                <tr key={String(item.id)}>
                  <td>{String(item.company)}</td>
                  <td>
                    {String(item.name)}
                    <br />
                    {String(item.email)}
                  </td>
                  <td>{String(item.country)}</td>
                  <td>{String(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="table-card" style={{ gridColumn: "1 / -1" }}>
          <div className="eyebrow">操作日志</div>
          <table>
            <thead>
              <tr>
                <th>操作人</th>
                <th>动作</th>
                <th>详情</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((item) => (
                <tr key={String(item.id)}>
                  <td>{String(item.actor)}</td>
                  <td>{String(item.action)}</td>
                  <td>{String(item.details)}</td>
                  <td>{String(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AdminPage>
  );
}
