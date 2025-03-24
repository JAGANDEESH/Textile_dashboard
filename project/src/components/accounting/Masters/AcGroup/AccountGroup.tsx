import React, { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { Pencil, Trash2, Eye, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const accountGroups = [
  { value: "assets", label: "Assets" },
  { value: "liabilities", label: "Liabilities" },
  { value: "income", label: "Income" },
  { value: "expenses", label: "Expenses" },
];

const initialAccountSubGroups = {
  assets: [
    { value: "cash", label: "Cash", children: [] },
    { value: "accounts-receivable", label: "Accounts Receivable", children: [] },
  ],
  liabilities: [
    { value: "loans", label: "Loans", children: [] },
    { value: "accounts-payable", label: "Accounts Payable", children: [] },
  ],
};

export default function AccountGroup() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [nestedSubGroups, setNestedSubGroups] = useState([]);
  const [customSubGroup, setCustomSubGroup] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [accountShortName, setAccountShortName] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [accountSubGroups, setAccountSubGroups] = useState(initialAccountSubGroups);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    setAccounts(storedAccounts);
  }, []);

  const handleAddAccount = () => {
    if (!selectedGroup || (!selectedSubGroup && nestedSubGroups.length === 0 && !customSubGroup) || !accountShortName) {
      alert("Please fill in all fields");
      return;
    }

    let newSubGroup = selectedSubGroup;
    if (showCustomInput && customSubGroup) {
      newSubGroup = { value: customSubGroup, label: customSubGroup, children: [] };
      setAccountSubGroups((prev) => ({
        ...prev,
        [selectedGroup.value]: [...(prev[selectedGroup.value] || []), newSubGroup],
      }));
    }

    const newAccounts = [
      ...accounts,
      {
        group: selectedGroup,
        subGroups: [newSubGroup, ...nestedSubGroups],
        shortName: accountShortName,
      },
    ];

    setAccounts(newAccounts);
    localStorage.setItem("accounts", JSON.stringify(newAccounts));

    // Reset state
    setSelectedSubGroup(null);
    setCustomSubGroup("");
    setShowCustomInput(false);
    setAccountShortName("");
    setNestedSubGroups([]);
  };

  const handleAddNestedSubGroup = () => {
    if (!selectedSubGroup && !customSubGroup) return;
    
    const newNestedSubGroup = customSubGroup
      ? { value: customSubGroup, label: customSubGroup, children: [] }
      : selectedSubGroup;

    setNestedSubGroups((prev) => [...prev, newNestedSubGroup]);
    setSelectedSubGroup(null);
    setCustomSubGroup("");
    setShowCustomInput(false);
  };

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
          <h2 className="text-3xl font-bold text-gray-900">🏦 Account Group</h2>
          <div className="flex space-x-6">
            {[
              { icon: Pencil, label: "Edit", path: "/Edit" },
              { icon: Trash2, label: "Delete", path: "/Delete" },
              { icon: Eye, label: "View", path: "/View" },
            ].map(({ icon: Icon, label, path }) => (
              <button key={label} onClick={() => navigate(path)} className="relative group flex items-center">
                <Icon size={24} className="text-gray-600 hover:text-gray-900" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md transition-opacity">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
            <div className="relative flex items-center">
              <Select
                options={selectedGroup ? accountSubGroups[selectedGroup.value] : []}
                value={selectedSubGroup}
                onChange={(option) => {
                  setSelectedSubGroup(option);
                  setShowCustomInput(option?.value === "other");
                }}
                placeholder="Select Account Sub Group..."
                isSearchable
                isDisabled={!selectedGroup}
                className="rounded-md flex-1"
              />
              {(selectedSubGroup || showCustomInput) && (
                <button
                  type="button"
                  onClick={handleAddNestedSubGroup}
                  className="ml-3 text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle size={24} />
                </button>
              )}
            </div>
            {showCustomInput && (
              <input
                type="text"
                value={customSubGroup}
                onChange={(e) => setCustomSubGroup(e.target.value)}
                placeholder="Enter a custom sub group"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mt-2"
              />
            )}
          </div>

          {/* Display Nested Sub Groups */}
          {nestedSubGroups.length > 0 && (
            <div className="mt-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
              <h4 className="text-gray-700 font-medium mb-2">Nested Sub Groups:</h4>
              {nestedSubGroups.map((sub, index) => (
                <div key={index} className="text-gray-800 bg-white px-3 py-1 rounded-lg shadow-sm mb-1">
                  {sub.label}
                </div>
              ))}
            </div>
          )}

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
              type="button"
              onClick={handleAddAccount}
              className="px-6 bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg transform hover:scale-105 active:scale-95"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
