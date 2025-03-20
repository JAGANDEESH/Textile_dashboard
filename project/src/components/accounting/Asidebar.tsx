import { useNavigate } from "react-router-dom";
import { Users, ArrowLeftRight, Eye, FileText, Home } from "lucide-react";

function Asidebar({ isOpen }) {
  const navigate = useNavigate(); // Use navigate hook

  const menuItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      submenu: [],
      onClick: () => navigate("/") // Navigate to Home
    },
    {
      title: "Masters",
      icon: <Users size={20} />,
      submenu: ["AC Group", "AC Master"],
      onClick: () => navigate("/Master") // ✅ FIXED: Proper onClick function
    },
    {
      title: "Transactions",
      icon: <ArrowLeftRight size={20} />,
      submenu: ["Cash Payment", "Cash Receipt", "Bank Payment", "Bank Receipt"],
    },
    {
      title: "View",
      icon: <Eye size={20} />,
      submenu: [],
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      submenu: ["Cash Book", "Bank Book", "Journal"],
    },
  ];

  return (
    <div className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed left-0 transition-all duration-300 ${isOpen ? "w-64" : "w-20"} shadow-xl overflow-y-auto`}>
      <div className="p-6 border-b border-gray-700/50">
        <h1 className={`font-bold ${isOpen ? "text-xl" : "text-center text-sm"} bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent`}>
          {isOpen ? "Financial Account" : "AS"}
        </h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-white/10 transition-colors"
              onClick={item.onClick} // ✅ FIXED: Corrected event handler
            >
              <div className="flex items-center">
                <span className="mr-3 text-blue-400">{item.icon}</span>
                {isOpen && <span className="text-gray-200">{item.title}</span>}
              </div>
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Asidebar;
