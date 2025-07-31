"use client";

import { useState, useEffect } from "react";
import { getBanner } from "../services/userServices";
import type { Banner } from "../types/auth";

interface BannerSliderProps {
  title?: string;
  onBannerClick?: (bannerId: string) => void;
}

export default function BannerSlider({
  title = "Temukan promo menarik",
  onBannerClick,
}: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await getBanner();
        setBanners(res.data);
      } catch (error) {
        console.error("Gagal memuat banner:", error);
      }
    }

    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        banners.length > 0 ? (prevIndex + 1) % banners.length : 0
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  const getVisibleBanners = () => {
    if (banners.length === 0) return [];

    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(banners[(currentIndex + i) % banners.length]);
    }
    return result;
  };

  const visibleBanners = getVisibleBanners();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex gap-4 overflow-hidden">
        {visibleBanners.map((banner, index) => (
          <div
            key={`${banner.banner_name}-${currentIndex}-${index}`}
            className={`rounded-lg flex-1 min-w-0 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => onBannerClick?.(banner.banner_name)}
          >
            <img
              src={banner.banner_image || "/placeholder.svg"}
              alt={banner.banner_name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
