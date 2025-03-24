import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ViewAccounts() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = () => {
      const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
      setAccounts(storedAccounts);
    };

    fetchAccounts();

    window.addEventListener("storage", fetchAccounts);
    return () => window.removeEventListener("storage", fetchAccounts);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-8"
    >
      <div className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-4xl border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">📋 View Accounts</h2>
          <button
            onClick={() => navigate("/AccountGroup")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Account
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-3">Account Group</th>
              <th className="border border-gray-300 p-3">Account Sub Group</th>
              <th className="border border-gray-300 p-3">Short Name</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <tr key={index} className="text-center border-b border-gray-300">
                  <td className="border border-gray-300 p-3">{account.group.label}</td>
                  <td className="border border-gray-300 p-3">{account.subGroup?.label || "-"}</td>
                  <td className="border border-gray-300 p-3">{account.shortName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-600">
                  No accounts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
