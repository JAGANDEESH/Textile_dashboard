import { useState } from "react";

import DashboardCards from "./DashboardCards";

import RecentTransactions from "./RecentTransaction";
import Asidebar from "./Asidebar";
import Anavbar from "./Anavbar";
import AccountForm from "./Masters/AccountGroup";

function Faapp() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Asidebar isOpen={sidebarOpen} />
        <Anavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="p-8 mt-16">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                  This Week
                </button>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                  Download Report
                </button>
              </div>
            </div>
            <DashboardCards />
            <RecentTransactions />
           
          </div>
        </main>
      </div>
    );
  }
  export default Faapp;