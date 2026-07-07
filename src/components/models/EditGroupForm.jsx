import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

import groupStore from "../../store/group.store.js";

const EditGroupForm = ({ isOpen, onClose, group }) => {
  const { updateGroup } = groupStore();
  //name, description, currency
  const [formData, setFormData] = useState({
    name: group?.name || "",
    description: group?.description || "",
    currency: group?.currency || "INR",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGroup(group.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-80 bg-black/50 flex justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-107.5  flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} className="text-blue-600" />
          </button>

          <h2 className="text-lg font-bold">Edit Group</h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between p-5"
        >
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Group Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter group name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter group description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
                <option value="AED">د.إ AED</option>
                <option value="JPY">¥ JPY</option>
                <option value="CAD">C$ CAD</option>
                <option value="AUD">A$ AUD</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            <Save size={20} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGroupForm;
