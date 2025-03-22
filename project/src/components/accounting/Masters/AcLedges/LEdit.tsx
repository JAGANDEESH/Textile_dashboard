import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface Account {
  ledgerCode: string;
  ledgerName: string;
  group: string;
  shortName: string;
  ledgerType: string;
  shortCode: string;
  glReference: string;
}

const dummyData: Account[] = [
  { group: "Assets", ledgerCode: "AC001", ledgerName: "Cash Account", shortName: "CASH", ledgerType: "Current", shortCode: "CA", glReference: "GL001" },
  { group: "Assets", ledgerCode: "AC002", ledgerName: "Bank Account", shortName: "BANK", ledgerType: "Savings", shortCode: "BA", glReference: "GL002" },
  { group: "Liabilities", ledgerCode: "LI001", ledgerName: "Loan Account", shortName: "LOAN", ledgerType: "Long Term", shortCode: "LA", glReference: "GL003" },
  { group: "Income", ledgerCode: "IN001", ledgerName: "Sales Revenue", shortName: "SALES", ledgerType: "Operating", shortCode: "SR", glReference: "GL004" },
  { group: "Expenses", ledgerCode: "EX001", ledgerName: "Salary Expense", shortName: "SAL", ledgerType: "Fixed", shortCode: "SE", glReference: "GL005" }
];

export default function LEdit() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const accountGroups: string[] = ["All", "Assets", "Liabilities", "Income", "Expenses"];

  const filteredData = dummyData.filter((item) => {
    return (
      (selectedGroup === "All" || selectedGroup === "" || item.group === selectedGroup) &&
      (item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ledgerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ledgerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ledgerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.glReference.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleEdit = (item: Account) => {
    navigate("/Ledger-Edit-Form", { state: { item } }); // ✅ Fixed path
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6 font-poppins"
    >
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-3xl font-bold text-gray-900 tracking-wide">Manage Accounts</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="flex-1 relative bg-white shadow-md rounded-lg">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-3 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="relative bg-white shadow-md rounded-lg">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="pl-12 pr-8 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none w-44"
          >
            {accountGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-blue-200 shadow-sm">
                <tr className="text-lg font-semibold text-gray-900">
                <th className="px-6 py-4 text-left">Account Ledger Code</th>
                <th className="px-6 py-4 text-left">Account Ledger Name</th>
                  <th className="px-6 py-4 text-left">Account Group</th>
              
                  <th className="px-6 py-4 text-left">Short Name</th>
                  <th className="px-6 py-4 text-left">Ledger Type</th>
                  <th className="px-6 py-4 text-left">Short Code</th>
                  <th className="px-6 py-4 text-left">GL Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 text-lg">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <motion.tr 
                      key={index} 
                      className="hover:bg-blue-100 transition-all duration-150 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    >
                          <td className="px-6 py-4">{item.ledgerCode}</td>
                          <td className="px-6 py-4">{item.ledgerName}</td>
                      <td className="px-6 py-4">{item.group}</td>
                  
                      <td className="px-6 py-4">{item.shortName}</td>
                      <td className="px-6 py-4">{item.ledgerType}</td>
                      <td className="px-6 py-4">{item.shortCode}</td>
                      <td className="px-6 py-4">{item.glReference}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-6 text-center text-gray-600 text-lg font-medium">
                      No matching records found
                    </td>
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
