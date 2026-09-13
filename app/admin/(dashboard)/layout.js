import { logout } from "./actions";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="container admin-header__inner">
          <div className="brand">
            Cafe <span>Lumière</span> 管理画面
          </div>
          <form action={logout}>
            <button type="submit" className="logout-btn">
              ログアウト
            </button>
          </form>
        </div>
      </header>
      <main className="admin-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
