"use client";

import { useState, useEffect } from "react";

interface Banner {
  id: string;
  title: string;
  image: string;
}

interface BannerSliderProps {
  title?: string;
  onBannerClick?: (bannerId: string) => void;
}

const banners: Banner[] = [
  {
    id: "saldo-gratis",
    title: "Saldo Gratis!",
    image: "../src/assets/Banner 1.png",
  },
  {
    id: "diskon-listrik",
    title: "Diskon listrik!",
    image: "../src/assets/Banner 2.png",
  },
  {
    id: "promo-makan",
    title: "Promo makan!",
    image: "../src/assets/Banner 3.png",
  },
  {
    id: "cashback",
    title: "Cashback 25%",
    image: "../src/assets/Banner 4.png",
  },
  {
    id: "buy-1-get-2",
    title: "Buy 1 Get 2!",
    image: "../src/assets/Banner 5.png",
  },
];

export default function BannerSlider({
  title = "Temukan promo menarik",
  onBannerClick,
}: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const visibleBanners = [
    banners[currentIndex],
    banners[(currentIndex + 1) % banners.length],
    banners[(currentIndex + 2) % banners.length],
    banners[(currentIndex + 3) % banners.length],
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex gap-4 overflow-hidden">
        {visibleBanners.map((banner, index) => (
          <div
            key={`${banner.id}-${currentIndex}-${index}`}
            className={`rounded-lg flex-1 min-w-0 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => onBannerClick?.(banner.id)}
          >
            <img
              src={banner.image || "/placeholder.svg"}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
