import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Wallet,
  Settings,
  Package,
  ShoppingCart,
  Box,
  Receipt,
  ChevronDown,
  Users,
  Truck,
  Factory,
  FileText,
  Scissors,
  Scale,
  Warehouse,
  PieChart,
} from 'lucide-react';

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const homeModule: NavItem = {
  icon: Home,
  label: 'Home',
  href: '#'
};

const dashboardModule: NavItem = {
  icon: LayoutDashboard,
  label: 'Dashboard',
  href: '#'
};

const accountingModule: NavItem = {
  icon: BookOpen,
  label: 'Accounting',
  subItems: [
    { label: 'Journal Entry', href: '#' },
    { label: 'Ledger', href: '#' },
    { label: 'Trial Balance', href: '#' },
    { label: 'Balance Sheet', href: '#' }
  ]
};

const mastersModule: NavItem = {
  icon: Settings,
  label: 'Masters',
  subItems: [
    { label: 'Company Profile', href: '#' },
    { label: 'Employee', href: '#' },
    { label: 'Customer', href: '#' },
    { label: 'Supplier', href: '#' },
    { label: 'Department', href: '#' }
  ]
};

const inventoryModule: NavItem = {
  icon: Package,
  label: 'Inventory',
  subItems: [
    { label: 'Stock Overview', href: '#' },
    { label: 'Stock Transfer', href: '#' },
    { label: 'Stock Adjustment', href: '#' },
    { label: 'Warehouse Management', href: '#' }
  ]
};

const purchaseModule: NavItem = {
  icon: ShoppingCart,
  label: 'Purchase',
  subItems: [
    { label: 'Purchase Order', href: '#' },
    { label: 'Purchase Invoice', href: '#' },
    { label: 'Purchase Return', href: '#' },
    { label: 'Supplier Payment', href: '#' }
  ]
};

const productionModule: NavItem = {
  icon: Factory,
  label: 'Production',
  subItems: [
    { label: 'Production Planning', href: '#' },
    { label: 'Work Orders', href: '#' },
    { label: 'Quality Control', href: '#' },
    { label: 'Machine Maintenance', href: '#' }
  ]
};

const salesModule: NavItem = {
  icon: Receipt,
  label: 'Sales',
  subItems: [
    { label: 'Sales Order', href: '#' },
    { label: 'Sales Invoice', href: '#' },
    { label: 'Sales Return', href: '#' },
    { label: 'Customer Payment', href: '#' }
  ]
};

const reportsModule: NavItem = {
  icon: PieChart,
  label: 'Reports',
  subItems: [
    { label: 'Sales Report', href: '#' },
    { label: 'Purchase Report', href: '#' },
    { label: 'Inventory Report', href: '#' },
    { label: 'Production Report', href: '#' },
    { label: 'Financial Report', href: '#' }
  ]
};

const navItems: NavItem[] = [
  homeModule,
  dashboardModule,
  accountingModule,
  mastersModule,
  inventoryModule,
  purchaseModule,
  productionModule,
  salesModule,
  reportsModule
];

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Package className="h-8 w-8 text-blue-400" />
        <span className="text-xl font-bold">TextileMS</span>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.subItems && toggleExpand(item.label)}
              className={`w-full flex items-center gap-3 px-2 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors ${
                expandedItems.includes(item.label) ? 'bg-gray-800' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.subItems && (
                <ChevronDown
                  className={`h-4 w-4 ml-auto transition-transform ${
                    expandedItems.includes(item.label) ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>
            
            {item.subItems && expandedItems.includes(item.label) && (
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