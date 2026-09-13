const concepts = [
  {
    icon: "☕",
    title: "自家焙煎の一杯",
    desc: "契約農園から直接仕入れた豆を、店内の焙煎機で毎朝丁寧に焙煎しています。",
  },
  {
    icon: "🌿",
    title: "季節を纏う一皿",
    desc: "旬の野菜や果物を使い、月替わりでメニューを見直す。何度来ても新しい発見があります。",
  },
  {
    icon: "🕰️",
    title: "時間を忘れる空間",
    desc: "古民家をリノベーションした店内は、木の温かみと静かな音楽に包まれています。",
  },
];

export default function Concept() {
  return (
    <section id="concept" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Our Concept</span>
          <h2 className="section-title">私たちのこだわり</h2>
          <p className="section-desc">
            素材・空間・時間、すべてにこだわった Cafe Lumière の三つの約束。
          </p>
        </div>
        <div className="concept-grid">
          {concepts.map((item) => (
            <div className="concept-card" key={item.title}>
              <div className="concept-card__icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
