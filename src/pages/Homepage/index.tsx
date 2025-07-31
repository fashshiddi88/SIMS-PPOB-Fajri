"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import type { RootState } from "../../store";
import type { ServiceItem } from "../../types/auth";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import BalanceCard from "../../components/Balance-card";
import ServiceMenu from "../../components/Service-menu";
import BannerSlider from "../../components/BannerSlider";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: profile } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const fixedProfile = profile
    ? {
        ...profile,
        profile_image: profile.profile_image?.toLowerCase().endsWith("/null")
          ? null
          : profile.profile_image,
      }
    : null;

  const handleServiceClick = (service: ServiceItem) => {
    navigate("/transaction", { state: { service } });
  };

  const handleBannerClick = (bannerId: string) => {
    console.log(`Banner clicked: ${bannerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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
