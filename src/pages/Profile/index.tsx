"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile, setProfile } from "../../features/profile/profileSlice";
import { logout } from "../../features/auth/authSlice";
import { updateProfile, uploadProfileImage } from "../../services/userServices";
import type { RootState } from "../../store";
import { AxiosError } from "axios";
import Navbar from "../../components/Navbar";
import ProfileForm from "../../components/ProfileForm";
import ProfilePhoto from "../../components/Profile-photo";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const fullName = `${profile?.first_name || ""} ${profile?.last_name || ""}`;

  const fixedProfile = profile
    ? {
        ...profile,
        profile_image: profile.profile_image?.toLowerCase().endsWith("/null")
          ? null
          : profile.profile_image,
      }
    : null;

  const handleUploadImage = async (file: File) => {
    try {
      const res = await uploadProfileImage(file);

      if (res.status === 0) {
        Swal.fire("Berhasil", res.message, "success");
        if (res.status === 0 && res.data !== null) {
          dispatch(setProfile(res.data));
        }
      } else {
        Swal.fire("Gagal", res.message, "error");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      Swal.fire(
        axiosError.response?.data?.message,
        "Terjadi kesalahan saat upload gambar",
        "error"
      );
    }
  };

  const handleSave = async (firstName: string, lastName: string) => {
    try {
      const response = await updateProfile({
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 0) {
        Swal.fire("Berhasil", response.message, "success");
        dispatch(fetchProfile());
      } else if (response.status === 108) {
        Swal.fire(
          "Token Invalid",
          "Sesi kamu habis, silakan login ulang",
          "error"
        );
        navigate("/login");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      Swal.fire(
        axiosError.response?.data?.message,
        "Terjadi kesalahan saat menyimpan",
        "error"
      );
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari akun ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");

      dispatch(logout());

      await Swal.fire("Berhasil!", "Anda telah logout.", "success");

      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <ProfilePhoto
              src={fixedProfile?.profile_image || undefined}
              alt="Profile Photo"
              onImageChange={handleUploadImage}
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {fullName}
            </h2>
          </div>

          <div className="flex justify-center">
            <ProfileForm
              initialData={{
                email: profile?.email ?? "",
                firstName: profile?.first_name ?? "",
                lastName: profile?.last_name ?? "",
              }}
              onLogout={handleLogout}
              onSave={handleSave}
              editButtonText="Edit Profil"
              logoutButtonText="Logout"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
