import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  const yearOptions = [
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
  ]; // Static for now, later can be fetched from backend

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      {/* Page Header with Year Selection */}
      <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
          Manage Accounts
        </h2>

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex-1 relative bg-white shadow-md rounded-lg overflow-hidden"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-3 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative bg-white shadow-md rounded-lg overflow-hidden"
        >
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="pl-12 pr-8 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none w-48"
          >
            {accountGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </motion.div>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-blue-200 shadow-sm">
                <tr className="text-lg font-semibold text-gray-900">
                  <th className="px-6 py-4 text-left">Group Name</th>
                  <th className="px-6 py-4 text-left">Parent</th>
                  <th className="px-6 py-4 text-left">Short Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 text-lg">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <motion.tr
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="hover:bg-blue-100 transition-all duration-150 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    >
        
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${groupColors[item.group]}`}>
                          {item.group}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-gray-900">{item.subGroup}</td>
                      <td className="px-6 py-3">
                        <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono text-gray-800">{item.shortName}</code>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-lg text-gray-500">No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
