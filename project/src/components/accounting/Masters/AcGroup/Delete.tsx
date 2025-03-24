import React, { useState, useEffect } from "react";
import Select from "react-select"; // If using react-select for dropdowns

interface GroupOption {
  value: string;
  label: string;
}

interface Item {
  id: number;
  group: string | GroupOption; // group can be a string or an object with value & label
}

const Delete: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    // Simulated API data
    setItems([
      { id: 1, group: "Finance" },
      { id: 2, group: "HR" },
      { id: 3, group: { value: "marketing", label: "Marketing" } }, // Handling objects
    ]);
  }, []);

  const filteredItems = items.filter((item) => {
    const groupName =
      typeof item.group === "string" ? item.group : item.group?.label;

    return (
      groupName &&
      typeof groupName === "string" &&
      groupName.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Delete Items</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search groups..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      {/* Table to Display Groups */}
      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Group</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">
                {typeof item.group === "string" ? item.group : item.group?.label}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional Select Dropdown (if needed) */}
      <Select
        options={items.map((item) => ({
          value: typeof item.group === "string" ? item.group : item.group?.value,
          label: typeof item.group === "string" ? item.group : item.group?.label,
        }))}
        placeholder="Select a group"
      />
    </div>
  );
};

export default Delete;
