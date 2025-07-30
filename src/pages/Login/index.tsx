"use client";

import LoginForm from "./LoginForm";
import IllustrationSection from "../../components/IllustrationSection";

export default function LoginPage() {
  const handleLogin = (email: string, password: string) => {
    console.log("Login submitted:", { email, password });
  };

  const handleRegisterClick = () => {
    console.log("Navigate to registration");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <LoginForm
          submitButtonText="Masuk"
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
