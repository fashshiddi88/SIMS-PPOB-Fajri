"use client";

import { useState, useEffect } from "react";
import BgBalance from "../assets/Background Saldo.png";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBalance } from "../features/balance/balanceSlice";

export default function BalanceCard() {
  const dispatch = useAppDispatch();

  const { balance, error } = useAppSelector((state) => state.balance);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

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
              {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
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
