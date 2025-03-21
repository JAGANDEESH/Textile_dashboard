import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [formData, setFormData] = useState({
    group: item?.group || "",
    subGroup: item?.subGroup || "",
    shortName: item?.shortName || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Implement update logic (API call, local state update, etc.)
    console.log("Updated Data:", formData);
    navigate(-1); // Go back after updating
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Account</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Group</label>
          <input
            type="text"
            name="group"
            value={formData.group}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Sub Group</label>
          <input
            type="text"
            name="subGroup"
            value={formData.subGroup}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Short Name</label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white px-3 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
