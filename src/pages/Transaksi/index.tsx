"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import { fetchBalance } from "../../features/balance/balanceSlice";
import { createTransaction } from "../../services/userServices";
import { AxiosError } from "axios";
import type { RootState } from "../../store";
import type { ServiceItem } from "../../types/auth";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import BalanceCard from "../../components/Balance-card";
import Swal from "sweetalert2";
import ServiceForm from "../../components/ServiceForm";
import Logo from "../../assets/Logo.png";

export default function TransactionPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data: profile } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
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

  const handleTransactionSubmit = async (serviceCode: string) => {
    try {
      const res = await createTransaction(serviceCode);

      if (res.status === 0 && res.data) {
        await Swal.fire({
          icon: "success",
          title: "Transaksi berhasil!",
          html: `Pembayaran ${
            res.data.service_name
          } sebesar <b>Rp ${res.data.total_amount.toLocaleString(
            "id-ID"
          )}</b> berhasil!`,
          confirmButtonText: "Kembali ke beranda",
          customClass: {
            confirmButton:
              "bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2",
          },
          buttonsStyling: false,
        });
        navigate("/home");
        dispatch(fetchBalance());
      } else {
        await Swal.fire({
          icon: "error",
          title: "Pembayaran gagal",
          text: res.message || "Pembayaran gagal.",
          confirmButtonText: "Kembali ke beranda",
          customClass: {
            confirmButton:
              "bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2",
          },
          buttonsStyling: false,
        });
        navigate("/home");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      await Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan",
        text: axiosError.response?.data?.message || "Top up gagal",
        confirmButtonText: "Kembali ke beranda",
        customClass: {
          confirmButton:
            "bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2",
        },
        buttonsStyling: false,
      });
      navigate("/home");
    }
  };

  const confirmTransactionSubmit = async (service: ServiceItem) => {
    const result = await Swal.fire({
      title: "Konfirmasi Transaksi",
      html: `Beli ${
        service.service_name
      } senilai <b>Rp ${service.service_tariff.toLocaleString("id-ID")}</b> ?`,
      imageUrl: Logo,
      imageWidth: 64,
      imageHeight: 64,
      imageAlt: "SIMS PPOB Logo",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan bayar",
      cancelButtonText: "Batalkan",
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2",
        cancelButton:
          "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      handleTransactionSubmit(service.service_code);
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
          <ServiceForm
            submitButtonText="Bayar"
            onSubmit={confirmTransactionSubmit}
          />
        </div>
      </div>
    </div>
  );
}
