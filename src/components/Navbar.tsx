"use client";

import { useLocation, Link } from "react-router-dom";
import LogoComponent from "./Logo";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/home">
          <LogoComponent />
        </Link>

        <div className="flex items-center space-x-8">
          <Link
            to="/topup"
            className={`font-medium hover:text-gray-800 ${
              isActive("/topup") ? "text-red-500" : "text-gray-600"
            }`}
          >
            Top Up
          </Link>
          <Link
            to="/transaction/history"
            className={`font-medium hover:text-gray-800 ${
              isActive("/transaction/history")
                ? "text-red-500"
                : "text-gray-600"
            }`}
          >
            Transaction
          </Link>
          <Link
            to="/profile"
            className={`font-medium hover:text-gray-800 ${
              isActive("/profile") ? "text-red-500" : "text-gray-600"
            }`}
          >
            Akun
          </Link>
        </div>
      </div>
    </nav>
  );
}
