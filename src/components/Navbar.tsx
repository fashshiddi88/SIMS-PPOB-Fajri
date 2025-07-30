"use client";

import LogoComponent from "./Logo";

interface NavbarProps {
  onTopUpClick?: () => void;
  onTransactionClick?: () => void;
  onAccountClick?: () => void;
}

export default function Navbar({
  onTopUpClick,
  onTransactionClick,
  onAccountClick,
}: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <LogoComponent />

        <div className="flex items-center space-x-8">
          <button
            onClick={onTopUpClick}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Top Up
          </button>
          <button
            onClick={onTransactionClick}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Transaction
          </button>
          <button
            onClick={onAccountClick}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Akun
          </button>
        </div>
      </div>
    </nav>
  );
}
