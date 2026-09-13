export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__content">
        <span className="hero__eyebrow">Since 2018 · Kyoto</span>
        <h1 className="hero__title">
          静けさの中で味わう、
          <br />
          一杯の時間
        </h1>
        <p className="hero__subtitle">
          自家焙煎の豆と季節の食材で仕立てる、隠れ家カフェ Cafe Lumière。
          忙しい日常から少し離れて、ゆったりとしたひとときをお過ごしください。
        </p>
        <div className="hero__actions">
          <a href="#reservation" className="btn btn-primary">
            今すぐ予約する
          </a>
          <a href="#menu" className="btn btn-outline">
            メニューを見る
          </a>
        </div>
      </div>
    </section>
  );
}
