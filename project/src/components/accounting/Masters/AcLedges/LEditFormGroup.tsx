import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface Account {
  group: string;
  ledgerCode: string;
  ledgerName: string;
  shortName: string;
  ledgerType: string;
  shortCode: string;
  glReference: string;
}

export default function LEditFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = (location.state as { item?: Account })?.item || {};

  const accountGroups = ["Assets", "Liabilities", "Income", "Expenses"];

  const [formData, setFormData] = useState<Account>({
    group: item?.group || "",
    ledgerCode: item?.ledgerCode || "",
    ledgerName: item?.ledgerName || "",
    shortName: item?.shortName || "",
    ledgerType: item?.ledgerType || "",
    shortCode: item?.shortCode || "",
    glReference: item?.glReference || "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!formData.ledgerName.trim()) {
      alert("Ledger Name cannot be empty!");
      return;
    }

    console.log("Updated Data:", formData);
    setSuccessMessage("Updated Successfully!");

    setTimeout(() => {
      setSuccessMessage("");
      navigate(-1);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="fixed top-[10%] bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl border border-blue-500 relative">
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-lg font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Account
        </h2>

        {successMessage && (
          <div className="flex items-center justify-center bg-green-100 text-green-700 py-2 px-4 rounded-lg mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Parent (Group)
            </label>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {accountGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {["ledgerCode", "ledgerName", "shortName", "ledgerType", "shortCode", "glReference"].map((name) => (
            <div key={name} className="">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                {name.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name as keyof Account]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 mt-4"
        >
          Update
        </button>
      </div>
    </div>
  );
}
