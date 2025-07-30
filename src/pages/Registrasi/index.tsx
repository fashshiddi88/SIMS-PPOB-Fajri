"use client";

import RegistrasiForm from "./RegistrasiForm";
import IllustrationSection from "../../components/IllustrationSection";

export default function RegisterPage() {
  const handleLogin = (email: string, password: string) => {
    console.log("Login submitted:", { email, password });
  };

  const handleRegisterClick = () => {
    console.log("Navigate to registration");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <RegistrasiForm
          submitButtonText="Registrasi"
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
