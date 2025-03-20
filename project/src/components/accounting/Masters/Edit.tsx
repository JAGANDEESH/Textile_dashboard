import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react"; // Import icon

// Sample JSON data (Replace this with an actual JSON fetch)
const accountsData = [
  { id: 1, group: "Assets", subGroup: "Cash", shortName: "CASH" },
  { id: 2, group: "Liabilities", subGroup: "Loans", shortName: "LOAN" },
  { id: 3, group: "Income", subGroup: "Sales", shortName: "SALES" },
];

export default function AccountForm() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [accountShortName, setAccountShortName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    // Simulate fetching data from JSON
    setAccounts(accountsData);
  }, []);

  const handleGroupChange = (selectedOption) => {
    setSelectedGroup(selectedOption);
    setSelectedSubGroup(null);
  };

  const handleSubGroupChange = (selectedOption) => {
    setSelectedSubGroup(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", {
      AccountGroup: selectedGroup,
      AccountSubGroup: selectedSubGroup,
      AccountShortName: accountShortName,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    alert("Delete function triggered!");
    setMenuOpen(false);
  };

  const handleView = () => {
    alert("View function triggered!");
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
    >
      <div className="bg-white/10 backdrop-blur-md shadow-lg p-8 rounded-2xl max-w-xl w-full border border-gray-200/50 relative">
        {/* 3-dot Toggle Menu */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
          >
            <MoreVertical size={24} />
          </button>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md z-10 border border-gray-200"
            >
              <ul className="py-2 text-gray-800">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleEdit}
                >
                  ✏️ Edit
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleDelete}
                >
                  🗑️ Delete
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleView}
                >
                  👀 View
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Edit Mode: Display Table */}
        {editMode ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
              📝 Edit Accounts
            </h2>
            <table className="w-full border-collapse border border-gray-300 shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Account Group</th>
                  <th className="border p-2">Sub Group</th>
                  <th className="border p-2">Short Name</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">
                      <input
                        type="text"
                        value={account.group}
                        onChange={(e) => {
                          const newAccounts = [...accounts];
                          newAccounts[index].group = e.target.value;
                          setAccounts(newAccounts);
                        }}
                        className="w-full border border-gray-300 rounded p-1 text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={account.subGroup}
                        onChange={(e) => {
                          const newAccounts = [...accounts];
                          newAccounts[index].subGroup = e.target.value;
                          setAccounts(newAccounts);
                        }}
                        className="w-full border border-gray-300 rounded p-1 text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={account.shortName}
                        onChange={(e) => {
                          const newAccounts = [...accounts];
                          newAccounts[index].shortName = e.target.value;
                          setAccounts(newAccounts);
                        }}
                        className="w-full border border-gray-300 rounded p-1 text-center"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setEditMode(false)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200"
            >
              ✅ Save Changes
            </button>
          </div>
        ) : (
          // Form Mode
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
              🏦 Account Form
            </h2>
            {/* Account Group */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Account Group
              </label>
              <Select
                options={accountsData.map(({ group }) => ({
                  value: group,
                  label: group,
                }))}
                value={selectedGroup}
                onChange={handleGroupChange}
                placeholder="Select Account Group..."
                isSearchable
                className="rounded-md"
              />
            </div>
            {/* Account Short Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Account Short Name
              </label>
              <input
                type="text"
                value={accountShortName}
                onChange={(e) => setAccountShortName(e.target.value)}
                placeholder="Enter Short Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Submit 🚀
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
