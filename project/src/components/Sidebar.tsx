import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Banknote,
  ClipboardList,
  ShoppingCart,
  Users,
  Truck,
  Building2,
  Settings,
  ChevronDown,
  Menu,
  DollarSign,
  Package,
  Warehouse,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
  target?: string; // Added target
  subItems?: SubMenuItem[];
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  target?: string; // Added target
  subItems?: SubMenuItem[];
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", href: "#" },
    { icon: LayoutDashboard, label: "Dashboard", href: "#", target: "_blank" },
    { icon: DollarSign, label: "Financial Accounts", href: "#", target: "_blank" },
    { icon: Package, label: "Raw Material", href: "#", target: "_blank" },
    { icon: Truck, label: "Domestic Sale", href: "#", target: "_blank" },
    { icon: Warehouse, label: "Stores Management", href: "#", target: "_blank" },
    {  icon: Briefcase, label: "Payroll", href: "#", target: "_blank" },
    {  icon: Settings, label: "Configuration", href: "#", target: "_blank" },
    {   icon: ShieldCheck, label: "Administration", href: "#", target: "_blank" },
      ];
  


  const renderMenuItems = (items: NavItem[] | SubMenuItem[], parentLabel: string = "") => {
    return items.map((item) => {
      const itemKey = parentLabel ? `${parentLabel}-${item.label}` : item.label;
      const isExpanded = expandedItems.includes(itemKey);

      return (
        <div key={itemKey}>
          {item.href ? (
            <a
              href={item.href}
              target={item.target || "_self"}
              className="w-full flex items-center gap-3 px-2 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {item.icon && <item.icon className="h-5 w-5" />}
              {isSidebarOpen && <span>{item.label}</span>}
            </a>
          ) : (
            <button
              onClick={() => item.subItems && toggleExpand(itemKey)}
              className={`w-full flex items-center gap-3 px-2 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors ${
                isExpanded ? "bg-gray-800" : ""
              }`}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
              {isSidebarOpen && <span>{item.label}</span>}
              {item.subItems && isSidebarOpen && (
                <ChevronDown
                  className={`h-4 w-4 ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              )}
            </button>
          )}
          {item.subItems && isExpanded && isSidebarOpen && (
            <div className="ml-4 pl-4 border-l border-gray-700">
              {renderMenuItems(item.subItems, itemKey)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${isSidebarOpen ? "w-64" : "w-16"} bg-gray-900 text-white p-4 transition-all duration-300`}
    >
      <button
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
        {isSidebarOpen && <span className="text-lg font-bold">TextileMS</span>}
      </button>
      <nav className="space-y-1">{renderMenuItems(navItems)}</nav>
    </aside>
  );
}
