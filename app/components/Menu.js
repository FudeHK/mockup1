const menuItems = [
  {
    icon: "🍵",
    name: "本日のハンドドリップ",
    price: "¥680",
    desc: "その日仕入れた豆の中から、店主が厳選した一杯をご提供します。",
  },
  {
    icon: "🥐",
    name: "自家製クロワッサンセット",
    price: "¥980",
    desc: "毎朝店内で焼き上げるバターの香り豊かなクロワッサンとドリンクのセット。",
  },
  {
    icon: "🍰",
    name: "季節のショートケーキ",
    price: "¥750",
    desc: "旬のフルーツをふんだんに使った、甘さ控えめの自家製ケーキです。",
  },
  {
    icon: "🥗",
    name: "彩り野菜のカフェプレート",
    price: "¥1,380",
    desc: "地元農家から届く野菜をメインにした、栄養バランスの良いランチプレート。",
  },
  {
    icon: "🍮",
    name: "濃厚プリン・ア・ラ・モード",
    price: "¥820",
    desc: "なめらかな口どけの自家製プリンに、季節のフルーツを添えて。",
  },
  {
    icon: "🍷",
    name: "ナチュラルワイン",
    price: "¥900〜",
    desc: "小規模生産者から仕入れる、料理に寄り添うナチュラルワインを取り揃えています。",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Menu</span>
          <h2 className="section-title">こだわりのメニュー</h2>
          <p className="section-desc">
            季節ごとに移り変わる、店主自慢のフード＆ドリンク。
          </p>
        </div>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div className="menu-card" key={item.name}>
              <div className="menu-card__image">{item.icon}</div>
              <div className="menu-card__body">
                <div className="menu-card__head">
                  <h3>{item.name}</h3>
                  <span className="menu-card__price">{item.price}</span>
                </div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
