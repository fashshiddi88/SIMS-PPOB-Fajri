"use client";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { WalletMinimal } from "lucide-react";
import type { ServiceItem } from "../types/auth";
import Button from "./Button";

interface ServiceFormProps {
  submitButtonText?: string;
  onSubmit: (service: ServiceItem) => void;
}

export default function ServiceForm({
  submitButtonText = "Pembayaran",
  onSubmit,
}: ServiceFormProps) {
  const location = useLocation();
  const service = location.state?.service as ServiceItem | undefined;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || typeof service.service_tariff !== "number") {
      toast.error("Tarif layanan tidak tersedia.");
      return;
    }

    onSubmit(service);
  };

  if (!service) {
    return <p>Service tidak ditemukan</p>;
  }

  return (
    <div className="w-full">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line">
          Pembayaran
        </h2>
        <p className="text-lg text-gray-800 flex items-center gap-2">
          <img
            src={service.service_icon}
            alt={service.service_name}
            className="w-12 h-12"
          />
          {service.service_name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 gap-x-2 ">
        <div className="flex flex-col ">
          <div className="flex gap-x-2 justify-between">
            <div className="relative flex flex-col w-full gap-5 justify-between">
              <div className="relative">
                <WalletMinimal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  disabled
                  value={
                    service.service_tariff
                      ? formatCurrency(service.service_tariff)
                      : ""
                  }
                  className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
              </div>

              <Button type="submit" variant="primary">
                {submitButtonText}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
