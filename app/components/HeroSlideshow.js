"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/hero-kyoto-machiya.jpg", alt: "店内の様子" },
  { src: "/images/hero-seating.jpg", alt: "客席とカウンター" },
  { src: "/images/hero-latte-closeup.jpg", alt: "ラテアートのクローズアップ" },
  { src: "/images/hero-window-light.jpg", alt: "窓辺の自然光" },
  { src: "/images/hero-pastry-display.jpg", alt: "焼き菓子のディスプレイ" },
];

const INTERVAL_MS = 9000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoplay(!mql.matches);

    const handleChange = (e) => setAutoplay(!e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <div className="hero__bg-image">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          style={{ "--pan-duration": `${INTERVAL_MS}ms` }}
          className={
            "hero__slide" + (i === index ? " hero__slide--active" : "")
          }
        />
      ))}
    </div>
  );
}
