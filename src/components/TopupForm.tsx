"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

interface TopupFormProps {
  placeholder?: string;
  submitButtonText?: string;
  onSubmit: (amount: number) => void;
}

const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopupForm({
  placeholder = "masukan nominal Top Up",
  submitButtonText = "Top Up",
  onSubmit,
}: TopupFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handlePresetClick = (presetAmount: number) => {
    setAmount(presetAmount.toString());
    setSelectedPreset(presetAmount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value === "") {
      setAmount("");
      setSelectedPreset(null);
      setErrorMessage("");
      return;
    }

    const parsed = parseInt(value);

    if (isNaN(parsed)) {
      setErrorMessage("Input harus berupa angka");
      return;
    }

    if (parsed < 10000 || parsed > 1000000) {
      setErrorMessage("Nominal harus antara 10.000 dan 1.000.000");
    } else {
      setErrorMessage("");
    }

    setAmount(value);
    setSelectedPreset(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(amount);

    if (isNaN(parsed)) {
      toast.error("Nominal tidak valid.");
      return;
    }

    if (parsed < 10000) {
      toast.error("Minimum top up adalah Rp 10.000");
      return;
    }

    if (parsed > 1000000) {
      toast.error("Maksimum top up adalah Rp 1.000.000");
      return;
    }

    onSubmit(parsed);
    setAmount("");
  };

  const isValidAmount = amount && Number.parseInt(amount) > 0;

  return (
    <div className="w-full">
      <div className="mb-1">
        <p className="text-sm text-gray-800 whitespace-pre-line">
          Silahkan Masukan
        </p>
        <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line">
          Nominal Top Up
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 gap-x-2 ">
        <div className="flex flex-col ">
          <div style={{ minHeight: "30px" }}>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
            )}
          </div>
          <div className="flex gap-x-2 justify-between">
            <div className="relative flex flex-col w-5/8 gap-5 justify-between">
              <input
                type="text"
                placeholder={placeholder}
                value={amount ? formatCurrency(Number.parseInt(amount)) : ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />

              <Button
                type="submit"
                disabled={!isValidAmount}
                {...(!isValidAmount
                  ? {
                      className: "bg-gray-400 hover:bg-gray-400 text-white",
                    }
                  : {
                      variant: "primary",
                    })}
              >
                {submitButtonText}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  type="button"
                  onClick={() => handlePresetClick(presetAmount)}
                  className={` text-sm border rounded-md font-medium transition-colors ${
                    selectedPreset === presetAmount
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-black-800 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {formatCurrency(presetAmount)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
