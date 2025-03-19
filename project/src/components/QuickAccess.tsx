import React from 'react';
import { FaHome, FaChartBar, FaCogs, FaInfoCircle } from 'react-icons/fa';

const QuickAccess = () => {
  return (
    <div className="fixed top-0 right-0 h-full w-16 bg-gray-800 p-4 flex flex-col items-center justify-start space-y-6 shadow-lg">
      <div className="flex flex-col items-center group">
        <FaHome size={24} className="text-white" />
        <span className="text-white mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Home</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaChartBar size={24} className="text-white" />
        <span className="text-white mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Analytics</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaCogs size={24} className="text-white" />
        <span className="text-white mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaInfoCircle size={24} className="text-white" />
        <span className="text-white mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">About</span>
      </div>
    </div>
  );
};

export default QuickAccess;