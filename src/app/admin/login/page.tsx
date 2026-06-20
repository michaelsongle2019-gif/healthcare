export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="admin-layout">
      <div
        className="page-section"
        style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
      >
        <div className="content-card" style={{ width: "min(520px, 100%)" }}>
          <div className="eyebrow">后台入口</div>
          <h1 className="page-title">网站管理后台</h1>
          <p className="section-copy">
            使用管理员账号登录，维护产品、资料和站点基础信息。
          </p>
          {error ? (
            <div className="status-banner" style={{ marginBottom: "1rem" }}>
              用户名或密码不正确，请重试。
            </div>
          ) : null}
          <form action="/admin/auth" method="post" className="admin-form">
            <label>
              用户名
              <input name="username" defaultValue="admin" required />
            </label>
            <label>
              密码
              <input
                name="password"
                type="password"
                defaultValue="ChangeMe123!"
                required
              />
            </label>
            <button type="submit">登录</button>
          </form>
        </div>
      </div>
    </div>
  );
}
