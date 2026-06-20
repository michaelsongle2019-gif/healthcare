import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const adminLinks = [
  { href: "/admin", label: "概览" },
  { href: "/admin/settings", label: "站点设置" },
  { href: "/admin/categories", label: "产品分类" },
  { href: "/admin/products", label: "产品管理" },
  { href: "/admin/documents", label: "资料管理" },
  { href: "/admin/leads", label: "线索与日志" }
];

export function AdminShell({
  user,
  children
}: {
  user: { username: string };
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="eyebrow">后台管理</div>
          <h2 className="admin-title" style={{ marginTop: "0.5rem" }}>
            {user.username}
          </h2>
          <nav className="admin-nav">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} style={{ marginTop: "1rem" }}>
            <button type="submit" className="button secondary">
              退出登录
            </button>
          </form>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
