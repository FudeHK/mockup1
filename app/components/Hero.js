import HeroSlideshow from "@/app/components/HeroSlideshow";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <HeroSlideshow />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <span className="hero__eyebrow">2018年開業・京都</span>
        <h1 className="hero__title">
          自家焙煎カフェ
          <br />
          Cafe Lumière
        </h1>
        <p className="hero__subtitle">
          自家焙煎のコーヒーと季節の食材を使ったメニューを提供しています。
          出町柳駅から徒歩8分、一軒家の店内でお過ごしいただけます。
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
