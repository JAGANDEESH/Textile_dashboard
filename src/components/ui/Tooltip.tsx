import React from "react";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
        {title}
      </div>
    </div>
  );
};

export default Tooltip;
