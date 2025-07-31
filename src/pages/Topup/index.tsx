"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import { fetchBalance } from "../../features/balance/balanceSlice";
import { topUpBalance } from "../../services/userServices";
import { AxiosError } from "axios";
import type { RootState } from "../../store";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import BalanceCard from "../../components/Balance-card";
import Swal from "sweetalert2";
import TopupForm from "../../components/TopupForm";
import Logo from "../../assets/Logo.png";

export default function TopupPage() {
  const dispatch = useAppDispatch();

  const { data: profile } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const fixedProfile = profile
    ? {
        ...profile,
        profile_image: profile.profile_image?.toLowerCase().endsWith("/null")
          ? null
          : profile.profile_image,
      }
    : null;

  const handleTopupSubmit = async (amount: number) => {
    try {
      const res = await topUpBalance(amount);

      if (res.status === 0 && res.data) {
        await Swal.fire({
          icon: "success",
          title: "Top up berhasil!",
          text: `Top up sebesar Rp ${amount.toLocaleString("id-ID")} berhasil.`,
        });

        dispatch(fetchBalance());
      } else {
        await Swal.fire({
          icon: "error",
          title: "Top up gagal",
          text: res.message || "Top up gagal.",
        });
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      await Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan",
        text: axiosError.response?.data?.message || "Top up gagal",
      });
    }
  };

  const confirmTopupSubmit = async (amount: number) => {
    const result = await Swal.fire({
      title: "Konfirmasi Top Up",
      text: `Anda yakin untuk top up sebesar Rp ${parseInt(
        amount.toString()
      ).toLocaleString("id-ID")} ?`,
      imageUrl: Logo,
      imageWidth: 64,
      imageHeight: 64,
      imageAlt: "SIMS PPOB Logo",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjut",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2",
        cancelButton:
          "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      handleTopupSubmit(amount);
    }
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
          <TopupForm
            placeholder="masukan nominal Top Up"
            submitButtonText="Top Up"
            onSubmit={confirmTopupSubmit}
          />
        </div>
      </div>
    </div>
  );
}
