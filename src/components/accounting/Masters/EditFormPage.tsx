import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react"; // Import icons

export default function EditFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [formData, setFormData] = useState({
    group: item?.group || "",
    subGroup: item?.subGroup || "",
    shortName: item?.shortName || "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated Data:", formData);
    
    // Show success message
    setSuccessMessage("Updated Successfully!");
    
    // Hide message after 2 seconds and navigate back
    setTimeout(() => {
      setSuccessMessage("");
      navigate(-1);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="fixed top-[15%] bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl border border-blue-500 relative">
        
        {/* Back Button */}
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

        {/* Success Message */}
        {successMessage && (
          <div className="flex items-center justify-center bg-green-100 text-green-700 py-2 px-4 rounded-lg mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Parent
          </label>
          <input
            type="text"
            name="group"
            value={formData.group}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Group Name
          </label>
          <input
            type="text"
            name="subGroup"
            value={formData.subGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Short Name
          </label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Update
        </button>
      </div>
    </div>
  );
}
