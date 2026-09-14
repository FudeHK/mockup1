export default function Access() {
  return (
    <section id="access" className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">アクセス・営業時間</h2>
          <p className="section-desc">住所・営業時間・連絡先はこちらです。</p>
        </div>
        <div className="access-grid">
          <div className="access-map" aria-hidden="true">
            MAP（Google マップ埋め込み想定エリア）
          </div>
          <ul className="info-list">
            <li>
              <h4>住所</h4>
              <p>京都府京都市左京区鴨川町1-2-3</p>
              <p>京阪「出町柳駅」より徒歩8分</p>
            </li>
            <li>
              <h4>営業時間</h4>
              <table className="hours-table">
                <tbody>
                  <tr>
                    <td>月〜金</td>
                    <td>10:00 〜 20:00（L.O. 19:30）</td>
                  </tr>
                  <tr>
                    <td>土日祝</td>
                    <td>9:00 〜 21:00（L.O. 20:30）</td>
                  </tr>
                  <tr>
                    <td>定休日</td>
                    <td>毎週水曜日</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <h4>お問い合わせ</h4>
              <p>075-123-4567</p>
              <p>hello@cafe-lumiere.example.com</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
