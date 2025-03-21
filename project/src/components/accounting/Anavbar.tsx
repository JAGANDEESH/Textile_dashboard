import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

function Anavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i); // Last 5 years

  return (
    <div className="bg-white shadow-md fixed top-0 right-0 left-0 h-16 flex items-center px-6 z-50 backdrop-blur-md bg-white/90">
      {/* Sidebar Toggle */}
      <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition">
        <Menu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-700 ml-4 flex-grow">
        Integrated Swimming Mill Information System
      </h1>

      {/* Year Dropdown */}
      <div className="relative">
        <select
          className="px-3 py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg text-sm focus:ring-blue-400 focus:border-blue-400 transition"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-6 flex-grow">
        <input
          type="text"
          placeholder="Search transactions, accounts..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Notifications */}
      <button className="p-2 hover:bg-gray-200 rounded-lg relative text-gray-600 transition">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* User Profile */}
      <button className="flex items-center gap-3 py-2 px-4 hover:bg-gray-200 rounded-lg transition">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
          A
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-700">Admin User</p>
          <p className="text-xs text-gray-500">admin@company.com</p>
        </div>
      </button>
    </div>
  );
}

export default Anavbar;
