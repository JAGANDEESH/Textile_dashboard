import React from "react";
import { Gauge, Package, ShoppingCart, Warehouse, Briefcase, Settings, ShieldCheck } from "lucide-react";
import ImageSlider from "./ImageSlider";
import InfoCard from "./InfoCard";
import CompanySection from "./CompanySection";



function Home() {
  const infoCards = [
    { id: 1, icon: Gauge, title: "Financial Account", description: "Streamline your production process", color: "bg-blue-500" },
    { id: 2, icon: Package, title: "Raw Material", description: "Real-time stock monitoring", color: "bg-green-500" },
    { id: 3, icon: ShoppingCart, title: "Domestic Sales", description: "Automate workflows and processes", color: "bg-purple-500" },
    { id: 4, icon: Warehouse, title: "Stores Management", description: "Automate workflows and processes", color: "bg-orange-500" },
    { id: 5, icon: Briefcase, title: "PayRoll", description: "Manage employee salaries and attendance", color: "bg-teal-500" },
    { id: 6, icon: Settings, title: "Configuration", description: "Customize system settings", color: "bg-gray-500" },
    { id: 7, icon: ShieldCheck, title: "Administration", description: "Manage users, permissions, and security", color: "bg-red-500" },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Image Slider Section */}
        <ImageSlider />

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {infoCards.map((card) => (
            <InfoCard key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* Company Information Section */}
      <CompanySection />
    </>
  );
}

export default Home;
