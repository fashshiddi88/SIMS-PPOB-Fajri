"use client";

import { useEffect, useState } from "react";
import { getProfile } from "../../services/userServices";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import BalanceCard from "../../components/Balance-card";
import ServiceMenu from "../../components/Service-menu";
import BannerSlider from "../../components/BannerSlider";
import type { UserProfile } from "../../types/auth";

export default function Homepage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfile();
        if (res.status === 0) {
          setProfile(res.data);
        } else {
          console.error("Gagal mengambil profile:", res.message);
        }
      } catch (error) {
        console.error("Gagal mengambil profile", error);
      }
    }

    fetchProfile();
  }, []);

  const fixedProfile = profile
    ? {
        ...profile,
        profile_image: profile.profile_image?.toLowerCase().endsWith("/null")
          ? null
          : profile.profile_image,
      }
    : null;

  const handleNavigation = (section: string) => {
    console.log(`Navigate to ${section}`);
  };

  const handleServiceClick = (serviceId: string) => {
    console.log(`Service clicked: ${serviceId}`);
  };

  const handleBannerClick = (bannerId: string) => {
    console.log(`Banner clicked: ${bannerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onTopUpClick={() => handleNavigation("topup")}
        onTransactionClick={() => handleNavigation("transaction")}
        onAccountClick={() => handleNavigation("account")}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProfileSection
            profileImage={fixedProfile?.profile_image || undefined}
            userName={
              fixedProfile
                ? `${fixedProfile.first_name} ${fixedProfile.last_name}`
                : undefined
            }
            welcomeText="Selamat datang,"
          />
          <BalanceCard />
        </div>

        <div className="mb-12">
          <ServiceMenu onServiceClick={handleServiceClick} />
        </div>

        <div>
          <BannerSlider
            title="Temukan promo menarik"
            onBannerClick={handleBannerClick}
          />
        </div>
      </div>
    </div>
  );
}
