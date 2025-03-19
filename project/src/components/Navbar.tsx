import React, { useState } from "react";
import { User, Menu, Search, Calendar, ChevronDown } from "lucide-react";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      className={`fixed top-0 right-0 bg-white border-b shadow-md h-16 z-30 flex items-center px-6 transition-all duration-300 ${
        isSidebarOpen ? "left-64" : "left-16"
      }`}
    >
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 ml-4 whitespace-nowrap">
        Integrated Spinning Mill Information System
      </h1>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 border rounded-lg px-3 py-2 ml-6 w-72 focus-within:ring-2 ring-blue-500 transition">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="ml-2 w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Date Display */}
      <div className="flex items-center text-gray-600 ml-6">
        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
        <span className="font-medium">{currentDate}</span>
      </div>

      {/* Profile Section */}
      <div className="ml-auto relative">
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <User className="h-6 w-6" />
          <span className="font-medium hidden md:inline">Profile</span>
          <ChevronDown className={`h-5 w-5 transition ${isProfileOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border py-2 z-40">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              View Profile
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 text-red-600 hover:bg-gray-100">
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
