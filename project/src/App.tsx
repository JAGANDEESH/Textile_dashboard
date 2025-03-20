import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuickAccess from "./components/QuickAccess";
import LoadingPage from "./components/LoadingPage"; 
import DelayedComponent from "./components/DelayedComponent"; 
import AccountForm from "./components/accounting/Masters/AccountForm";
import Anavbar from "./components/accounting/Anavbar";
import Asidebar from "./components/accounting/Asidebar";

// Lazy-loaded components
const Home = lazy(() => import("./components/Home"));
const JournalEntry = lazy(() => import("./components/accounting/JournalEntry"));
const Ledger = lazy(() => import("./components/accounting/Ledger"));
const TrialBalance = lazy(() => import("./components/accounting/TrialBalance"));
const BalanceSheet = lazy(() => import("./components/accounting/BalanceSheet"));
const Faapp = lazy(() => import("./components/accounting/Faapp"));

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* FA Page loads independently */}
        <Route
          path="/FA"
          element={
            <Suspense fallback={<LoadingPage />}>
              <DelayedComponent>
                <Faapp />
              </DelayedComponent>
            </Suspense>
          }
        />

        {/* Master Page with Anavbar & Asidebar */}
        <Route
          path="/Master"
          element={
            <div className="min-h-screen bg-gray-100 flex transition-all duration-300">
              <Asidebar isOpen={isSidebarOpen} />
              
              <div className="flex-1 transition-all duration-300 ml-64">
              <Anavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="pt-16 px-6">
                  <AccountForm />
                </main>
              </div>
            </div>
          }
        />

        {/* Main Layout (All Other Routes) */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-100 flex transition-all duration-300">
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

              <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-16"} ${isRightSidebarOpen ? "mr-56" : "mr-0"}`}>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <main className="pt-16 px-6">
                  <Suspense fallback={<LoadingPage />}>
                    <Routes>
                      <Route path="/" element={<DelayedComponent><Home /></DelayedComponent>} />
                      <Route path="/journal-entry" element={<DelayedComponent><JournalEntry /></DelayedComponent>} />
                      <Route path="/ledger" element={<DelayedComponent><Ledger /></DelayedComponent>} />
                      <Route path="/trial-balance" element={<DelayedComponent><TrialBalance /></DelayedComponent>} />
                      <Route path="/balance-sheet" element={<DelayedComponent><BalanceSheet /></DelayedComponent>} />
                    </Routes>
                  </Suspense>
                </main>

                <Footer />
              </div>

              {isRightSidebarOpen && <QuickAccess />}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
