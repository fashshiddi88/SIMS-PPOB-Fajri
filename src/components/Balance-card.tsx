"use client";

import { useState } from "react";
import BgBalance from "../assets/Background Saldo.png";
import { Eye, EyeOff } from "lucide-react";

interface BalanceCardProps {
  balance?: number;
  balanceText?: string;
  toggleText?: string;
}

export default function BalanceCard({
  balance = 1000000,
  balanceText = "Saldo anda",
  toggleText = "Lihat Saldo",
}: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(false);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="text-white p-6 rounded-lg relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${BgBalance})` }}
    >
      <div className="relative z-10">
        <p className="text-sm opacity-90 mb-2">{balanceText}</p>
        <div className="text-2xl font-bold mb-4">
          {showBalance ? formatBalance(balance) : "Rp ••••••••"}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-[#f13b2f] h-6">{toggleText}</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-white hover:text-gray-200 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0"
          >
            {showBalance ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
