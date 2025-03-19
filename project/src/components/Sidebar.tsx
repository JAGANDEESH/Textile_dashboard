import React from "react";
import { Menu, Home, BarChart, ClipboardList, ShoppingCart, Factory, LineChart, FileText, Package } from "lucide-react";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }) {
  return (
    <aside className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
      
      {/* Sidebar Header */}
      <div className="flex items-center p-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="text-gray-300 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">TextileMS</span>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2">
        <NavItem icon={Home} text="Dashboard" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('home')} />
        <NavItem icon={BarChart} text="Accounting" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('trial-balance')} />
        <NavItem icon={ClipboardList} text="Masters" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('balance-sheet')} />
        <NavItem icon={ShoppingCart} text="Purchase" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('purchase')} />
        <NavItem icon={Factory} text="Production" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('production')} />
        <NavItem icon={LineChart} text="Sales" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('sales')} />
        <NavItem icon={FileText} text="Reports" isOpen={isSidebarOpen} setCurrentPage={() => setCurrentPage('reports')} />
      </nav>
    </aside>
  );
}

function NavItem({ icon: Icon, text, isOpen, setCurrentPage }) {
  return (
    <button 
      onClick={setCurrentPage}
      className="w-full text-left flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg"
    >
      <Icon className="h-5 w-5" />
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
}
