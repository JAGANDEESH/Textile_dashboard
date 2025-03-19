import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Gauge, Package, Zap } from "lucide-react";

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
    { icon: Gauge, title: "Efficient", description: "Streamline your production process", color: "bg-blue-500" },
    { icon: Package, title: "Inventory", description: "Real-time stock monitoring", color: "bg-green-500" },
    { icon: Zap, title: "Automation", description: "Automate workflows and processes", color: "bg-purple-500" },
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

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex transition-all duration-300">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
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

          {/* Footer & Quick Access */}
          <Footer />
          <QuickAccess />
        </div>
      </div>
    </Router>
  );
}
