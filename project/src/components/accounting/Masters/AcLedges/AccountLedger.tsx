import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountLedger() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    uniqueId: `ACC-${Date.now()}`,
    accountGroup: "",
    accountSubGroup: "",
    ledgerCode: "",
    ledgerName: "",
    shortName: "",
    ledgerType: "",
    ledgerSubType: "",
    shortCode: "",
    glReference: "",
  });

  const accountGroups = {
    Assets: ["Cash", "Accounts Receivable"],
    Liabilities: ["Loans", "Accounts Payable"],
    Income: ["Sales", "Interest"],
    Expenses: ["Salary", "Rent"],
  };

  const ledgerTypes = {
    General: ["Current Assets", "Fixed Assets"],
    Capital: ["Equity", "Debt"],
    Expense: ["Operating", "Non-Operating"],
  };

  // Handle input changes efficiently
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Form validation and submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData.accountGroup || !formData.ledgerCode || !formData.ledgerName) {
      alert("Please fill in required fields.");
      return;
    }

    console.log("Submitted Data:", formData);
    
    // Reset form after successful submission
    setFormData({
      uniqueId: `ACC-${Date.now()}`,
      accountGroup: "",
      accountSubGroup: "",
      ledgerCode: "",
      ledgerName: "",
      shortName: "",
      ledgerType: "",
      ledgerSubType: "",
      shortCode: "",
      glReference: "",
    });
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-3/4 relative">
        {/* Title and Toggler Button */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">📝 Create Account Ledger</h2>
          
          {/* Toggler Button (Three Dots) */}
          <div className="relative" ref={menuRef}>
            <button
              className="text-gray-600 hover:text-gray-800 text-2xl p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ⋮
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50 border">
                <button 
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/Ledger-Edit");
                    setMenuOpen(false);
                  }}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  👀 View
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  ❌ Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Account Group */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Account Group</label>
              <select name="accountGroup" value={formData.accountGroup} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm">
                <option value="">Select Account Group</option>
                {Object.keys(accountGroups).map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Account Sub Group</label>
              <select name="accountSubGroup" value={formData.accountSubGroup} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm">
                <option value="">Select Sub Group</option>
                {accountGroups[formData.accountGroup]?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ledger Code & Ledger Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Ledger Code</label>
              <input type="text" name="ledgerCode" value={formData.ledgerCode} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm" required />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Ledger Name</label>
              <input type="text" name="ledgerName" value={formData.ledgerName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm" required />
            </div>
          </div>

          {/* Short Name & Short Code */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Short Name</label>
              <input type="text" name="shortName" value={formData.shortName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm" />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Short Code</label>
              <input type="text" name="shortCode" value={formData.shortCode} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm" />
            </div>
          </div>

          {/* Ledger Type & Ledger Sub Type */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Ledger Type</label>
              <select name="ledgerType" value={formData.ledgerType} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm">
                <option value="">Select Ledger Type</option>
                {Object.keys(ledgerTypes).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Ledger Sub Type</label>
              <select name="ledgerSubType" value={formData.ledgerSubType} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm">
                <option value="">Select Ledger Sub Type</option>
                {ledgerTypes[formData.ledgerType]?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* GL Reference */}
          <div>
            <label className="block text-gray-600 font-medium">GL Reference</label>
            <input type="text" name="glReference" value={formData.glReference} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg shadow-sm" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg">
            ✅ Add Ledger
          </button>
        </form>
      </div>
    </div>
  );
}
