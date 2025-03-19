import React from 'react';
import { LogOut, User, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b h-16 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
          
          <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
