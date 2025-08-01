"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import { getTransactionHistory } from "../../services/userServices";
import type { RootState } from "../../store";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import BalanceCard from "../../components/Balance-card";
import TransactionHistory from "../../components/TransactionHistory";

export default function HistoryPage() {
  const dispatch = useAppDispatch();

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
          <TransactionHistory
            limit={5}
            showMoreText="Lihat Lebih Banyak"
            onLoadMore={async (offset, limit) => {
              return await getTransactionHistory(offset, limit);
            }}
          />
        </div>
      </div>
    </div>
  );
}
