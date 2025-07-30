"use client";

import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import BalanceCard from "../../components/Balance-card";
import ServiceMenu from "../../components/Service-menu";
import BannerSlider from "../../components/BannerSlider";

export default function Homepage() {
  const handleNavigation = (section: string) => {
    console.log(`Navigate to ${section}`);
  };

  const handleServiceClick = (serviceId: string) => {
    console.log(`Service clicked: ${serviceId}`);
  };

  const handleBannerClick = (bannerId: string) => {
    console.log(`Banner clicked: ${bannerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        onTopUpClick={() => handleNavigation("topup")}
        onTransactionClick={() => handleNavigation("transaction")}
        onAccountClick={() => handleNavigation("account")}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Row 1: Profile and Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProfileSection
            userName="Kristanto Wibowo"
            welcomeText="Selamat datang,"
          />
          <BalanceCard
            balance={1000000}
            balanceText="Saldo anda"
            toggleText="Lihat Saldo"
          />
        </div>

        {/* Row 2: Service Menu */}
        <div className="mb-12">
          <ServiceMenu onServiceClick={handleServiceClick} />
        </div>

        {/* Row 3: Banner Slider */}
        <div>
          <BannerSlider
            title="Temukan promo menarik"
            onBannerClick={handleBannerClick}
          />
        </div>
      </div>
    </div>
  );
}
