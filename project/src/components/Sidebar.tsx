import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Settings,
  Package,
  ShoppingCart,
  Factory,
  Receipt,
  PieChart,
  Menu,
  ChevronDown
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  {
    icon: BookOpen, label: 'Accounting', subItems: [
      { label: 'Journal Entry', href: '#' },
      { label: 'Ledger', href: '#' }
    ]
  },
  {
    icon: Settings, label: 'Masters', subItems: [
      { label: 'Company Profile', href: '#' },
      { label: 'Employee', href: '#' }
    ]
  },
  {
    icon: Package, label: 'Inventory', subItems: [
      { label: 'Stock Overview', href: '#' },
      { label: 'Warehouse Management', href: '#' }
    ]
  },
  {
    icon: ShoppingCart, label: 'Purchase', subItems: [
      { label: 'Purchase Order', href: '#' },
      { label: 'Supplier Payment', href: '#' }
    ]
  },
  {
    icon: Factory, label: 'Production', subItems: [
      { label: 'Production Planning', href: '#' },
      { label: 'Work Orders', href: '#' }
    ]
  },
  {
    icon: Receipt, label: 'Sales', subItems: [
      { label: 'Sales Order', href: '#' },
      { label: 'Customer Payment', href: '#' }
    ]
  },
  {
    icon: PieChart, label: 'Reports', subItems: [
      { label: 'Sales Report', href: '#' },
      { label: 'Financial Report', href: '#' }
    ]
  }
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (label) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-4 overflow-y-auto transition-all ${isExpanded ? 'w-64' : 'w-20'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-gray-300 hover:text-white p-2 rounded-lg mb-6"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.subItems && toggleExpand(item.label)}
              className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors ${expandedItems.includes(item.label) ? 'bg-gray-800' : ''}`}
            >
              <item.icon className="h-5 w-5" />
              {isExpanded && <span>{item.label}</span>}
              {item.subItems && isExpanded && (
                <ChevronDown
                  className={`h-4 w-4 ml-auto transition-transform ${expandedItems.includes(item.label) ? 'rotate-180' : ''}`}
                />
              )}
            </button>
            {item.subItems && expandedItems.includes(item.label) && isExpanded && (
              <div className="mt-1 ml-4 pl-4 border-l border-gray-700">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.label}
                    href={subItem.href}
                    className="block py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
