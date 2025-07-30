"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";
import type { LoginPayload } from "../../types/auth";
import LoginForm from "./LoginForm";
import IllustrationSection from "../../components/IllustrationSection";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const payload: LoginPayload = { email, password };
      const result = await login(payload);

      localStorage.setItem("token", result.token);
      toast.success("Login berhasil!");

      navigate("/home");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    console.log("Navigate to registration");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <LoginForm
          submitButtonText={loading ? "Loading..." : "Masuk"}
          onSubmit={handleLogin}
          onFooterLinkClick={handleRegisterClick}
        />
      </div>

      <div className="flex-1 hidden lg:block">
        <IllustrationSection />
      </div>
    </div>
  );
}
