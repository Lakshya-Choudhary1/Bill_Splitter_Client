import React, { useState } from "react";
import { X, Users } from "lucide-react";
import groupStore from "../../store/group.store.js";
import Loading from "../layout/Loading.jsx";

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currency: "INR",
  });
  const [loading, setLoading] = useState(false);

  const { createGroup } = groupStore();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    setLoading(true);
    createGroup({
      name: formData.name,
      description: formData.description,
      currency: formData.currency,
    });
    setLoading(false);

    setFormData({
      name: "",
      description: "",
      currency: "INR",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-100 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <Users size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold">Create Group</h2>
              <p className="text-sm text-gray-500">
                Create a new expense group
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Group Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Goa Trip"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Friends trip expenses..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INR">🇮🇳 INR</option>
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
              <option value="GBP">🇬🇧 GBP</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? <Loading /> : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
