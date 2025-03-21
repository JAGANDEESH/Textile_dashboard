import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";

interface Account {
  group: string;
  subGroup: string;
  shortName: string;
}

const dummyData: Account[] = [
  { group: "Assets", subGroup: "Cash", shortName: "CASH" },
  { group: "Assets", subGroup: "Accounts Receivable", shortName: "AR" },
  { group: "Liabilities", subGroup: "Loans", shortName: "LOAN" },
  { group: "Liabilities", subGroup: "Accounts Payable", shortName: "AP" },
  { group: "Income", subGroup: "Sales", shortName: "SALES" },
  { group: "Income", subGroup: "Interest", shortName: "INT" },
  { group: "Expenses", subGroup: "Salary", shortName: "SAL" },
  { group: "Expenses", subGroup: "Rent", shortName: "RENT" },
];

const groupColors: Record<string, string> = {
  Assets: "bg-emerald-100 text-emerald-800",
  Liabilities: "bg-red-100 text-red-800",
  Income: "bg-blue-100 text-blue-800",
  Expenses: "bg-amber-100 text-amber-800",
};

export default function Edit() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const accountGroups: string[] = ["All", "Assets", "Liabilities", "Income", "Expenses"];

  const filteredData = dummyData.filter((item) => {
    return (
      (selectedGroup === "All" || selectedGroup === "" || item.group === selectedGroup) &&
      (item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleEdit = (item: Account) => {
    navigate(`/edit-form`, { state: { item } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-900">Account</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition bg-white appearance-none w-44"
            >
              {accountGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Group</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    >
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${groupColors[item.group]}`}>
                          {item.group}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-sm text-gray-900">{item.subGroup}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-gray-800">{item.shortName}</code>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">No matching records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
