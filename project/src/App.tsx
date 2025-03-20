import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Gauge, Package, ShoppingCart, Warehouse, Briefcase, Settings, ShieldCheck } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider";
import InfoCard from "./components/InfoCard";
import CompanySection from "./components/CompanySection";
import Footer from "./components/Footer";
import JournalEntry from "./components/accounting/JournalEntry";
import Ledger from "./components/accounting/Ledger";
import TrialBalance from "./components/accounting/TrialBalance";
import BalanceSheet from "./components/accounting/BalanceSheet";
import QuickAccess from "./components/QuickAccess";


function Home() {
  const infoCards = [
    { icon: Gauge, title: "Financial Account", description: "Streamline your production process", color: "bg-blue-500" },
    { icon: Package, title: "Raw Material", description: "Real-time stock monitoring", color: "bg-green-500" },
    { icon: ShoppingCart, title: "Domestic Sales", description: "Automate workflows and processes", color: "bg-purple-500" },
    { icon: Warehouse, title: "Stores Management", description: "Automate workflows and processes", color: "bg-orange-500" },
    { icon: Briefcase, title: "PayRoll", description: "Manage employee salaries and attendance", color: "bg-teal-500" },
    { icon: Settings, title: "Configuration", description: "Customize system settings", color: "bg-gray-500" },
    { icon: ShieldCheck, title: "Administration", description: "Manage users, permissions, and security", color: "bg-red-500" },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ImageSlider />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {infoCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
      <CompanySection />
    </>
  );
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false); // Track right sidebar

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex transition-all duration-300">
        {/* Sidebar (Left) */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content Area (Shifts when sidebar expands) */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} ${isRightSidebarOpen ? "mr-56" : "mr-14"}`}>
          {/* Navbar */}
          <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

          {/* Page Routing */}
          <main className="pt-16 px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journal-entry" element={<JournalEntry />} />
              <Route path="/ledger" element={<Ledger />} />
              <Route path="/trial-balance" element={<TrialBalance />} />
              <Route path="/balance-sheet" element={<BalanceSheet />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Right Sidebar */}
        <QuickAccess />
      </div>
    </Router>
  );
}
