import React from "react";
import { User, Menu } from "lucide-react";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <header className={`fixed top-0 right-0 bg-white border-b h-16 z-30 flex items-center px-6 transition-all duration-300 ${isSidebarOpen ? "left-64" : "left-16"}`}>
      
      {/* Show Sidebar Toggle in Navbar when collapsed */}
    

      <h1 className="text-xl font-semibold text-gray-800 ml-4">Dashboard</h1>

      <div className="ml-auto">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </button>
      </div>
      
    </header>
  );
}
