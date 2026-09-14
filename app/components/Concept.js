const concepts = [
  {
    icon: "☕",
    title: "自家焙煎",
    desc: "契約農園から仕入れた豆を、店内の焙煎機で毎朝焙煎しています。",
  },
  {
    icon: "🌿",
    title: "季節のメニュー",
    desc: "旬の食材を使い、メニューは月替わりで更新しています。",
  },
  {
    icon: "🕰️",
    title: "一軒家の店内",
    desc: "古民家をリノベーションした店内です。座席数は24席です。",
  },
];

export default function Concept() {
  return (
    <section id="concept" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Our Concept</span>
          <h2 className="section-title">お店について</h2>
          <p className="section-desc">素材・空間・時間へのこだわりです。</p>
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
