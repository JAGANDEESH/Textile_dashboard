import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuickAccess from "./components/QuickAccess";
import LoadingPage from "./components/LoadingPage"; 
import DelayedComponent from "./components/DelayedComponent"; 

import Anavbar from "./components/accounting/Anavbar";
import Asidebar from "./components/accounting/Asidebar";
import Edit from "./components/accounting/Masters/Edit";
import EditFormPage from "./components/accounting/Masters/EditFormPage";  // ✅ Import EditFormPage
import AccountGroup from "./components/accounting/Masters/AccountGroup";
import Delete from "./components/accounting/Masters/Delete";
import View from "./components/accounting/Masters/View";

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
        {/* FA Page (Loads Independently) */}
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

        {/* Edit Page (Fixed Navbar & Sidebar) */}
        <Route
          path="/Edit"
          element={
            <div className="min-h-screen bg-gray-100 flex">
              {/* Navbar Fixed at the Top */}
              <Anavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16" />

              {/* Sidebar Fixed on the Left */}
              <Asidebar isOpen={isSidebarOpen} />

              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} pt-16 px-6`}>
                <Edit />
              </div>
            </div>
          }
        />

        {/* Edit Form Page (Fixed Navbar & Sidebar) */}
        <Route
          path="/edit-form"
          element={
            <div className="min-h-screen bg-gray-100 flex">
              {/* Navbar Fixed at the Top */}
              <Anavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16" />

              {/* Sidebar Fixed on the Left */}
              <Asidebar isOpen={isSidebarOpen} />

              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} pt-16 px-6`}>
                <EditFormPage />
              </div>
            </div>
          }
        />

<Route
          path="/delete"
          element={
            <div className="min-h-screen bg-gray-100 flex">
              {/* Navbar Fixed at the Top */}
              <Anavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16" />

              {/* Sidebar Fixed on the Left */}
              <Asidebar isOpen={isSidebarOpen} />

              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} pt-16 px-6`}>
                <Delete />
              </div>
            </div>
          }
        />

<Route
          path="/view"
          element={
            <div className="min-h-screen bg-gray-100 flex">
              {/* Navbar Fixed at the Top */}
              <Anavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16" />

              {/* Sidebar Fixed on the Left */}
              <Asidebar isOpen={isSidebarOpen} />

              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} pt-16 px-6`}>
                <View />
              </div>
            </div>
          }
        />

        {/* Master Page (Fixed Navbar & Sidebar) */}
        <Route
          path="/AccountGroup"
          element={
            <div className="min-h-screen bg-gray-100 flex">
              {/* Navbar Fixed at the Top */}
              <Anavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16" />

              {/* Sidebar Fixed on the Left */}
              <Asidebar isOpen={isSidebarOpen} />

              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} pt-16 px-6`}>
                <AccountGroup />
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
