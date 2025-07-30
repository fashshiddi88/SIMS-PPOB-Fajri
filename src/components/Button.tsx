"use client";

import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "w-full font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
