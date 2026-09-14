export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="brand">
          Cafe <span>Lumière</span>
        </div>
        <p>京都府京都市左京区鴨川町1-2-3 ／ 075-123-4567</p>
        <div className="footer-links">
          <a href="#concept">こだわり</a>
          <a href="#menu">メニュー</a>
          <a href="#access">アクセス</a>
          <a href="#reservation">ご予約</a>
          <a href="/admin/login">管理者ログイン</a>
        </div>
        <p style={{ marginTop: 24 }}>
          &copy; {new Date().getFullYear()} Cafe Lumière. All rights reserved.
        </p>
        <p className="footer-disclaimer">
          本サイトはポートフォリオ用の架空店舗です。制作:fude0723@gmail.com
        </p>
      </div>
    </footer>
  );
}
