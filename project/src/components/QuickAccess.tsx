import React, { useState } from "react";
import { Bell, Receipt, Pin, Settings, ChevronLeft } from "lucide-react";

interface QuickAccessItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({ icon, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-all rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-3 text-gray-600">{icon}</span>
        <span className="flex-1 text-left text-sm font-medium text-gray-800">{title}</span>
      </button>
      {isOpen && <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-700">{content}</div>}
    </div>
  );
};

export default function QuickAccess() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-white border-l border-gray-300 transition-all duration-300 shadow-lg z-50 ${
        isExpanded ? "w-56" : "w-14"
      }`}
    >
      {/* Toggle Button */}
      <button
        className="absolute -left-4 top-4 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:scale-105 transition-transform"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronLeft
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Sidebar Content */}
      <div className={`h-full overflow-auto px-3 py-4 ${!isExpanded && "hidden md:block"}`}>
        <div className="p-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Quick Access</h2>
        </div>

        <QuickAccessItem
          icon={<Bell className="w-5 h-5" />}
          title="Notifications"
          content={
            <div className="space-y-1 text-sm">
              <p>New order received</p>
              <p>Stock level alert</p>
              <p>Payment confirmed</p>
            </div>
          }
        />

        <QuickAccessItem
          icon={<Receipt className="w-5 h-5" />}
          title="Recent Transactions"
          content={
            <div className="space-y-1 text-sm">
              <p>Order #1234 - $500</p>
              <p>Order #1235 - $750</p>
              <p>Order #1236 - $1,200</p>
            </div>
          }
        />

        <QuickAccessItem
          icon={<Pin className="w-5 h-5" />}
          title="Pinned Items"
          content={
            <div className="space-y-1 text-sm">
              <p>Monthly Report</p>
              <p>Inventory Status</p>
              <p>Team Schedule</p>
            </div>
          }
        />

        <QuickAccessItem
          icon={<Settings className="w-5 h-5" />}
          title="Settings"
          content={
            <div className="space-y-1 text-sm">
              <p>Profile Settings</p>
              <p>Notifications</p>
              <p>Preferences</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
