import { Menu, Search, Bell } from "lucide-react";

function Anavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
      <div className="bg-white shadow-lg fixed top-0 right-0 left-0 h-16 flex items-center px-4 z-10 backdrop-blur-sm bg-white/90">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
          <Menu size={24} />
        </button>
        
        <div className="flex-1 mx-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search transactions, accounts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
  
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative text-gray-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-3 py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@company.com</p>
            </div>
          </button>
        </div>
      </div>
    );
  }
  export default Anavbar