import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Select from "react-select";
import DataTable from "react-data-table-component";

interface Account {
  group: string;
  subGroup: string;
  shortName: string;
}

const initialData: Account[] = [
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

// Year Options
const yearOptions = [
  { value: "2023-2024", label: "2023-2024" },
  { value: "2024-2025", label: "2024-2025" },
  { value: "2025-2026", label: "2025-2026" },
  { value: "2026-2027", label: "2026-2027" },
];

// Account Group Options
const accountGroupOptions = [
  { value: "All", label: "All" },
  { value: "Assets", label: "Assets" },
  { value: "Liabilities", label: "Liabilities" },
  { value: "Income", label: "Income" },
  { value: "Expenses", label: "Expenses" },
];

export default function View() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState(yearOptions[1]); // Default to 2024-2025
  const [accounts] = useState<Account[]>(initialData);

  const filteredData = accounts.filter((item) => {
    return (
      (selectedGroup === "All" || item.group === selectedGroup) &&
      (item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const columns = [
    {
      name: "Sub Group",
      selector: (row: Account) => row.subGroup,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row: Account) => row.group,
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row: Account) => row.shortName,
      sortable: true,
      center: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      {/* Page Header with Year Selection */}
      <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 tracking-wide">View Accounts</h2>

        {/* Year Dropdown */}
        <Select
          value={selectedYear}
          onChange={(selectedOption) => setSelectedYear(selectedOption)}
          options={yearOptions}
          className="w-64"
          styles={{
            control: (provided) => ({
              ...provided,
              padding: "5px",
              borderRadius: "8px",
              borderColor: "#D1D5DB",
              boxShadow: "none",
              "&:hover": { borderColor: "#3B82F6" },
            }),
          }}
          menuPortalTarget={document.body}
        />
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-4">
        {/* Search Box */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex-1 relative bg-white shadow-md rounded-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-3 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </motion.div>

        {/* Account Group Dropdown */}
        <Select
          value={accountGroupOptions.find((option) => option.value === selectedGroup)}
          onChange={(selectedOption) => setSelectedGroup(selectedOption?.value || "All")}
          options={accountGroupOptions}
          className="w-64"
          styles={{
            control: (prevState) => ({
              ...prevState,
              padding: "5px",
              borderRadius: "8px",
              borderColor: "#D1D5DB",
              boxShadow: "none",
              "&:hover": { borderColor: "#3B82F6" },
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </div>

      {/* DataTable */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"  style={{ overflow: "visible" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={{
              headCells: {
                style: {
                  // fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "#3B82F6",
                  color: "white",
                },
              },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
