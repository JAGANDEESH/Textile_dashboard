import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react"; // Import icon

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

export default function AccountForm() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [accountShortName, setAccountShortName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleGroupChange = (selectedOption: React.SetStateAction<null>) => {
    setSelectedGroup(selectedOption);
    setSelectedSubGroup(null);
  };

  const handleSubGroupChange = (selectedOption: React.SetStateAction<null>) => {
    setSelectedSubGroup(selectedOption);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Submitted Data:", {
      AccountGroup: selectedGroup,
      AccountSubGroup: selectedSubGroup,
      AccountShortName: accountShortName,
    });
  };

  const handleEdit = () => {
    alert("Edit function triggered!");
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
    const handleClickOutside = (event: { target: unknown; }) => {
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
      <div className="bg-white/10 backdrop-blur-md shadow-lg p-8 rounded-2xl max-w-md w-full border border-gray-200/50 relative">
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

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          🏦 Account Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Account Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Account Group
            </label>
            <Select
              options={accountGroups}
              value={selectedGroup}
              onChange={handleGroupChange}
              placeholder="Select Account Group..."
              isSearchable
              className="rounded-md"
            />
          </div>

          {/* Account Sub Group (Dynamic based on Account Group) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Account Sub Group
            </label>
            <Select
              options={selectedGroup ? accountSubGroups[selectedGroup.value] : []}
              value={selectedSubGroup}
              onChange={handleSubGroupChange}
              placeholder="Select Account Sub Group..."
              isSearchable
              isDisabled={!selectedGroup}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
  <button
    type="submit"
    className="px-4 bg-blue-600 text-white py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-200 shadow transform hover:scale-105 active:scale-95"
  >
    Save
  </button>
</div>


        </form>
      </div>
    </motion.div>
  );
}
