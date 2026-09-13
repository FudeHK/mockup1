export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="brand">
          Cafe <span>Lumière</span>
        </a>
        <nav className="site-nav">
          <a href="#concept">こだわり</a>
          <a href="#menu">メニュー</a>
          <a href="#access">アクセス</a>
          <a href="#reservation" className="nav-cta">
            ご予約
          </a>
        </nav>
      </div>
    </header>
  );
}
