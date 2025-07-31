"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchServices } from "../features/services/serviceSlice";
import type { ServiceItem } from "../types/auth";

interface ServiceMenuProps {
  onServiceClick?: (service: ServiceItem) => void;
}

export default function ServiceMenu({ onServiceClick }: ServiceMenuProps) {
  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return <p>Loading layanan...</p>;
  }

  if (error) {
    return <p className="text-red-500">Gagal memuat layanan: {error}</p>;
  }
  return (
    <div className="grid grid-cols-12 gap-4">
      {services.map((service: ServiceItem) => (
        <button
          key={service.service_code}
          onClick={() => onServiceClick?.(service)}
          className="flex flex-col items-center m-4 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-2`}
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="object-contain"
            />
          </div>
          <span className="text-xs text-gray-600 text-center leading-tight">
            {service.service_name}
          </span>
        </button>
      ))}
    </div>
  );
}
