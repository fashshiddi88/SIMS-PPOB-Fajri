"use client";

import { useNavigate } from "react-router-dom";
import RegistrasiForm from "./RegistrasiForm";
import IllustrationSection from "../../components/IllustrationSection";
import { registerUser } from "../../services/authServices";
import { AxiosError } from "axios";
import type { RegisterPayload } from "../../types/auth";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterPayload) => {
    try {
      const response = await registerUser(data);
      console.log("Registrasi berhasil:", response.data);
      toast.success("Registrasi berhasil");
      navigate("/login");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Registrasi gagal. Silakan coba lagi."
      );
    }
  };

  const handleRegisterClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <RegistrasiForm
          submitButtonText="Registrasi"
          onSubmit={handleRegister}
          onFooterLinkClick={handleRegisterClick}
        />
      </div>

      <div className="flex-1 hidden lg:block">
        <IllustrationSection />
      </div>
    </div>
  );
}
