"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import LogoComponent from "../../components/Logo";
import Button from "../../components/Button";

interface LoginFormProps {
  title?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  submitButtonText?: string;
  footerText?: string;
  footerLinkText?: string;
  onSubmit?: (email: string, password: string) => void;
  onFooterLinkClick?: () => void;
}

export default function RegistrasiForm({
  submitButtonText = "Registrasi",
  onSubmit,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    } else {
      console.log("Login attempt:", { email, password });
    }
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi tidak cocok");
      return;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <LogoComponent className="mb-8" />

      <div className="mb-8">
        <span className="flex text-2xl font-bold text-gray-800 text-center justify-center leading-tight whitespace-pre-line">
          Lengkapi data untuk <br />
          membuat akun
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="masukan email anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="nama depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="nama belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="buat password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </span>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword1 ? "text" : "password"}
            placeholder="konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full text-black pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword1(!showPassword1)}
          >
            {showPassword1 ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </span>
        </div>

        <Button type="submit" variant="primary">
          {submitButtonText}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        sudah punya akun? login{" "}
        <Link
          to="/login"
          className="text-red-500 hover:text-red-600 font-medium"
        >
          di sini
        </Link>
      </p>
    </div>
  );
}
