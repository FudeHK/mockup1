import Image from "next/image";

const menuItems = [
  {
    image: "/images/menu-coffee.jpg",
    name: "本日のハンドドリップ",
    price: "¥680",
    desc: "その日の仕入れ豆で淹れるハンドドリップコーヒーです。",
  },
  {
    image: "/images/menu-croissant.jpg",
    name: "自家製クロワッサンセット",
    price: "¥980",
    desc: "店内で焼くクロワッサンとドリンクのセットです。",
  },
  {
    image: "/images/menu-cake.jpg",
    name: "季節のショートケーキ",
    price: "¥750",
    desc: "季節のフルーツを使ったショートケーキです。",
  },
  {
    image: "/images/menu-lunch-plate.jpg",
    name: "彩り野菜のカフェプレート",
    price: "¥1,380",
    desc: "地元野菜を中心にしたランチプレートです。",
  },
  {
    image: "/images/menu-pudding.jpg",
    name: "濃厚プリン・ア・ラ・モード",
    price: "¥820",
    desc: "自家製プリンに季節のフルーツを添えています。",
  },
  {
    image: "/images/menu-wine.jpg",
    name: "ナチュラルワイン",
    price: "¥900〜",
    desc: "小規模生産者のナチュラルワインを取り扱っています。",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Menu</span>
          <h2 className="section-title">メニュー</h2>
          <p className="section-desc">季節ごとに内容を見直しています。</p>
        </div>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div className="menu-card" key={item.name}>
              <div className="menu-card__image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
                />
              </div>
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
