"use client";

interface ServiceItem {
  id: string;
  name: string;
  iconPath: string;
  color: string;
}

interface ServiceMenuProps {
  onServiceClick?: (serviceId: string) => void;
}

const services: ServiceItem[] = [
  {
    id: "pbb",
    name: "PBB",
    iconPath: "../src/assets/PBB.png",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "listrik",
    name: "Listrik",
    iconPath: "../src/assets/Listrik.png",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "pulsa",
    name: "Pulsa",
    iconPath: "../src/assets/Pulsa.png",
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: "pdam",
    name: "PDAM",
    iconPath: "../src/assets/PDAM.png",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "pgn",
    name: "PGN",
    iconPath: "../src/assets/PGN.png",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "tv",
    name: "TV Langganan",
    iconPath: "../src/assets/Televisi.png",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "musik",
    name: "Musik",
    iconPath: "../src/assets/Musik.png",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "voucher-game",
    name: "Voucher Game",
    iconPath: "../src/assets/Game.png",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "voucher-makanan",
    name: "Voucher Makanan",
    iconPath: "../src/assets/Voucher Makanan.png",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "kurban",
    name: "Kurban",
    iconPath: "../src/assets/Kurban.png",
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: "zakat",
    name: "Zakat",
    iconPath: "../src/assets/Zakat.png",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "paket-data",
    name: "Paket Data",
    iconPath: "../src/assets/Paket Data.png",
    color: "bg-blue-100 text-blue-600",
  },
];

export default function ServiceMenu({ onServiceClick }: ServiceMenuProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onServiceClick?.(service.id)}
          className="flex flex-col items-center m-4 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div
            className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center text-xl mb-2`}
          >
            <img
              src={service.iconPath}
              alt={service.name}
              className="object-contain"
            />
          </div>
          <span className="text-xs text-gray-600 text-center leading-tight">
            {service.name}
          </span>
        </button>
      ))}
    </div>
  );
}
