import React, { useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const accountGroups = [
  { value: "assets", label: "Assets" },
  { value: "liabilities", label: "Liabilities" },
  { value: "income", label: "Income" },
  { value: "expenses", label: "Expenses" },
];

const accountSubGroups = {
  assets: [
    { value: "cash", label: "Cash" },
    { value: "accounts-receivable", label: "Accounts Receivable" },
  ],
  liabilities: [
    { value: "loans", label: "Loans" },
    { value: "accounts-payable", label: "Accounts Payable" },
  ],
  income: [
    { value: "sales", label: "Sales" },
    { value: "interest", label: "Interest" },
  ],
  expenses: [
    { value: "salary", label: "Salary" },
    { value: "rent", label: "Rent" },
  ],
};

export default function AccountGroup() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [accountShortName, setAccountShortName] = useState("");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-8"
    >
      <div className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-lg border border-gray-300">
        {/* Header with Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">🏦 Account Form</h2>
          <div className="flex space-x-6">
            {[{ icon: Pencil, label: "Edit", path: "/Edit" },
              { icon: Trash2, label: "Delete", path: "/Delete" },
              { icon: Eye, label: "View", path: "/View" }].map(({ icon: Icon, label, path }) => (
              <button key={label} onClick={() => navigate(path)} className="relative group flex items-center">
                <Icon size={24} className="text-gray-600 hover:text-gray-900" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md transition-opacity">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <form className="space-y-6">
          {/* Account Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Group</label>
            <Select
              options={accountGroups}
              value={selectedGroup}
              onChange={setSelectedGroup}
              placeholder="Select Account Group..."
              isSearchable
              className="rounded-md"
            />
          </div>

          {/* Account Sub Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Sub Group</label>
            <Select
              options={selectedGroup ? accountSubGroups[selectedGroup.value] : []}
              value={selectedSubGroup}
              onChange={setSelectedSubGroup}
              placeholder="Select Account Sub Group..."
              isSearchable
              isDisabled={!selectedGroup}
              className="rounded-md"
            />
          </div>

          {/* Account Short Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Short Name</label>
            <input
              type="text"
              value={accountShortName}
              onChange={(e) => setAccountShortName(e.target.value)}
              placeholder="Enter Short Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg transform hover:scale-105 active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
