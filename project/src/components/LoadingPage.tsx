import React from "react";
import logo from "../assests/Logo.jpg"; // ✅ Corrected import path

function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50">
      {/* Logo with animation */}
      <img
        src={logo}
        alt="Samruva Technologies"
        className="w-32 h-32 animate-pulse opacity-90"
      />

      {/* Loading Text */}
      <h2 className="text-2xl font-bold text-white mt-6">Loading Your Dashboard</h2>
      <p className="text-blue-300 mt-2">Please wait while we prepare everything...</p>

      {/* Loading Indicator */}
      <div className="relative mt-8">
        <div className="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute inset-0 border-t-transparent"></div>
      </div>

      {/* Progress Bars */}
      <div className="mt-8 space-y-3">
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-400 rounded-full animate-pulse delay-1500"></div>
        </div>
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-300 rounded-full animate-pulse delay-3000"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
