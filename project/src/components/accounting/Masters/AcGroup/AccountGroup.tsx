import React, { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { Eye, Pencil, PlusCircle, Trash2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const accountGroups = [
  { value: "assets", label: "Assets" },
  { value: "liabilities", label: "Liabilities" },
  { value: "income", label: "Income" },
  { value: "expenses", label: "Expenses" },
];

const initialAccountSubGroups = {
  assets: [
    { value: "cash", label: "Cash" },
    { value: "accounts-receivable", label: "Accounts Receivable" },
  ],
  liabilities: [
    { value: "loans", label: "Loans" },
    { value: "accounts-payable", label: "Accounts Payable" },
  ],
};

export default function AccountGroup() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [accountShortName, setAccountShortName] = useState("");
  const [accountSubGroups, setAccountSubGroups] = useState(initialAccountSubGroups);
  const [subGroupTree, setSubGroupTree] = useState(null); // Tree structure
  const navigate = useNavigate();

  useEffect(() => {
    const storedTree = JSON.parse(localStorage.getItem("subGroupTree")) || null;
    setSubGroupTree(storedTree);
  }, []);

  useEffect(() => {
    localStorage.setItem("subGroupTree", JSON.stringify(subGroupTree));
  }, [subGroupTree]);

  const addSubGroup = () => {
    if (!selectedSubGroup) return;

    const newNode = { value: selectedSubGroup.value, label: selectedSubGroup.label, child: null };

    if (!subGroupTree) {
      setSubGroupTree(newNode);
    } else {
      let current = subGroupTree;
      while (current.child) {
        current = current.child;
      }
      current.child = newNode;
      setSubGroupTree({ ...subGroupTree });
    }

    setSelectedSubGroup(null);
  };

  const removeSubGroup = (node, parent) => {
    if (!node) return;

    if (parent === null) {
      setSubGroupTree(null);
    } else {
      parent.child = null;
      setSubGroupTree({ ...subGroupTree });
    }
  };

  const renderSubGroups = (node, parent = null) => {
    if (!node) return null;
    return (
      <div className="ml-6 border-l-2 pl-3 border-gray-400 relative">
        <div className="text-gray-800 bg-white px-3 py-1 rounded-lg shadow-sm flex justify-between items-center">
          {node.label}
          <button type="button" onClick={() => removeSubGroup(node, parent)} className="text-red-500 hover:text-red-700 ml-2">
            <XCircle size={20} />
          </button>
        </div>
        {node.child && renderSubGroups(node.child, node)}
      </div>
    );
  };

  const handleAddAccount = () => {
    if (!selectedGroup || !subGroupTree || !accountShortName) return;

    const newAccount = {
      group: selectedGroup,
      subGroupTree,
      shortName: accountShortName,
    };

    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    storedAccounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(storedAccounts));

    // Reset form
    setSelectedGroup(null);
    setSubGroupTree(null);
    setAccountShortName("");

    navigate("/View");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-8"
    >
      <div className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-lg border border-gray-300">
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

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Account Sub Group</label>
          <div className="relative flex items-center">
            <Select
              options={selectedGroup ? accountSubGroups[selectedGroup.value] : []}
              value={selectedSubGroup}
              onChange={setSelectedSubGroup}
              placeholder="Select Account Sub Group..."
              isSearchable
              isDisabled={!selectedGroup}
              className="rounded-md flex-1"
            />
            {selectedSubGroup && (
              <button type="button" onClick={addSubGroup} className="ml-3 text-blue-600 hover:text-blue-800">
                <PlusCircle size={24} />
              </button>
            )}
          </div>
        </div>

        {subGroupTree && (
          <div className="mt-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
            <h4 className="text-gray-700 font-medium mb-2">Nested Sub Groups:</h4>
            {renderSubGroups(subGroupTree)}
          </div>
        )}

        <div className="mb-4 mt-4">
          <label className="block text-gray-700 font-medium mb-2">Account Short Name</label>
          <input
            type="text"
            value={accountShortName}
            onChange={(e) => setAccountShortName(e.target.value)}
            placeholder="Enter short name..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="button"
          onClick={handleAddAccount}
          className="mt-4 px-6 bg-green-600 text-white py-3 rounded-md w-full"
        >
          Add Account
        </button>
      </div>
    </motion.div>
  );
}
