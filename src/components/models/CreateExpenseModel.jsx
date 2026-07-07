import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import groupStore from "../../store/group.store";
import expenseStore from "../../store/expense.store";

const CreateExpenseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: 0,
  });

  const { selectedGroup } = groupStore();
  const { createExpense } = expenseStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, amount } = formData;

    if (!title.trim() || amount <= 0) {
      toast.error("Invalid cradentials");
      return;
    }

    createExpense(selectedGroup.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[92%] max-w-100 rounded-3xl bg-gray-100 shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Add Expense</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
            <input
              type="text"
              placeholder="Expense title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows={3}
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseModal;
