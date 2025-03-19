import React from 'react';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b h-16 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        
        <div className="flex items-center gap-4">
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