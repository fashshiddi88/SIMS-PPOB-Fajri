"use client";

import { useState, useEffect } from "react";
import BgBalance from "../assets/Background Saldo.png";
import { Eye, EyeOff } from "lucide-react";
import { getBalance } from "../services/userServices";

export default function BalanceCard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await getBalance();
        if (res.status === 0 && res.data) {
          setBalance(res.data.balance);
        } else {
          setError(res.message || "Gagal memuat saldo.");
        }
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat mengambil saldo.");
      }
    };

    fetchBalance();
  }, []);

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
        <p className="text-sm opacity-90 mb-2">Saldo Anda</p>
        <div className="text-2xl font-bold mb-4">
          {error
            ? "Error"
            : balance === null
            ? "Loading..."
            : showBalance
            ? formatBalance(balance)
            : "Rp ••••••••"}
        </div>
        {!error && (
          <div className="flex items-center gap-2">
            <span className="text-sm bg-[#f13b2f] h-6 px-2 py-0.5 rounded">
              {showBalance ? "Sembunyikan" : "Lihat Saldo"}
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-gray-200 transition-colors focus:outline-none"
            >
              {showBalance ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
