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
  subItems?: SubMenuItem[];
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
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
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
    { icon: DollarSign, label: "Financial Accounts", subItems: [
        { label: "Masters", href: "#", subItems: [
            { label: "Ac Group", href: "#" },
            { label: "Ac Master", href: "#" },
          ]},
        { label: "Transaction", href: "#", subItems: [
            { label: "Cash Payment", href: "#" },
            { label: "Cash Receipt", href: "#" },
            { label: "Bank Payment", href: "#" },
            { label: "Bank Receipt", href: "#" },
            { label: "Journal", href: "#" },
          ]},
        { label: "View", href: "#" },
        { label: "Reports", href: "#" },
        { label: "Setting", href: "#" },
      ]},
    { icon: Package, label: "Raw Material", subItems: [
        { label: "Company Profile", href: "#", subItems: [
            { label: "Company Details", href: "#" },
            { label: "Branch Management", href: "#" },
          ]},
        { label: "Employee", href: "#" },
        { label: "Customer", href: "#" },
        { label: "Supplier", href: "#" },
        { label: "Department", href: "#" },
      ]},
    { icon: Truck, label: "Domestic Sale", subItems: [
        { label: "Purchase Order", href: "#", subItems: [
            { label: "Local Purchase", href: "#" },
            { label: "International Purchase", href: "#" },
          ]},
        { label: "Purchase Invoice", href: "#" },
        { label: "Purchase Return", href: "#" },
      ]},
    { icon: Warehouse, label: "Stores Management", subItems: [
        { label: "Inventory", href: "#" },
        { label: "Stock Movement", href: "#" },
      ]},
    { icon: Briefcase, label: "Payroll", subItems: [
        { label: "Employee Salary", href: "#" },
        { label: "Attendance Tracking", href: "#" },
      ]},
    { icon: Settings, label: "Configuration", subItems: [
        { label: "System Settings", href: "#" },
        { label: "User Management", href: "#" },
      ]},
    { icon: ShieldCheck, label: "Administration", subItems: [
        { label: "Roles & Permissions", href: "#" },
        { label: "Audit Logs", href: "#" },
      ]},
  ];

  const renderMenuItems = (items: NavItem[] | SubMenuItem[], parentLabel: string = "") => {
    return items.map((item) => {
      const itemKey = parentLabel ? `${parentLabel}-${item.label}` : item.label;
      const isExpanded = expandedItems.includes(itemKey);

      return (
        <div key={itemKey}>
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
                className={`h-4 w-4 ml-auto transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
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
      className={`fixed left-0 top-0 h-screen ${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gray-900 text-white p-4 transition-all duration-300`}
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
