import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ArrowLeftRight, Eye, FileText, Home, ChevronDown, ChevronUp } from "lucide-react";

function Asidebar({ isOpen, className = "" }) {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const menuItems = [
    { title: "Home", icon: <Home size={20} />, onClick: () => navigate("/") },
    { title: "Masters", icon: <Users size={20} />, 
    submenu: [
      { title: "AC Group", onClick: () => navigate("/AccountGroup") },
      { title: "AC Ledges", onClick: () => navigate("/AccountLedger") },
    ],},
    {
      title: "Transactions",
      icon: <ArrowLeftRight size={20} />,
      submenu: [
        { title: "Cash ", onClick: () => navigate("/cash-book") },
        { title: "Bank Book", onClick: () => navigate("/bank-book") },
      ],
     
    },
    { title: "View", icon: <Eye size={20} />, submenu: [] },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      
    },
  ];

  return (
    <div
      className={`bg-gray-900 text-white fixed left-0 top-16 h-[calc(100vh-4rem)] transition-all duration-300 shadow-lg
        ${isOpen ? "w-64" : "w-20"} overflow-y-auto ${className}`}
    >
      <div className="p-6 border-b border-gray-700/50">
        <h1 className={`font-bold ${isOpen ? "text-xl" : "text-center text-sm"} text-blue-400`}>
          {isOpen ? "Financial Account" : "AS"}
        </h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-white/10 transition-colors"
              onClick={item.submenu ? () => toggleSubmenu(index) : item.onClick}
            >
              <div className="flex items-center">
                <span className="mr-3 text-blue-400">{item.icon}</span>
                {isOpen && <span className="text-gray-200">{item.title}</span>}
              </div>
              {isOpen && item.submenu && (
                openSubmenu === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />
              )}
            </button>
            {isOpen && item.submenu && openSubmenu === index && (
              <div className="pl-12 bg-gray-800">
                {item.submenu.map((sub, subIndex) => (
                  <button
                    key={subIndex}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10 transition-colors"
                    onClick={sub.onClick}
                  >
                    {sub.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Asidebar;
