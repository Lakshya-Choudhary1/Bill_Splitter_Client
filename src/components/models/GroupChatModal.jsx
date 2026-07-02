import React from "react";
import { X, Users } from "lucide-react";

const GroupChatModal = ({ isOpen, onClose, group }) => {
  if (!isOpen || !group) return null;

  return (
    <div
      className="fixed inset-0 z-75 bg-black/50 flex items-start justify-center "
      onClick={onClose}
    >
      <div
        className="bg-white  w-full max-w-107  h-screen flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between  p-5 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold">{group.name}</h2>

            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Users size={16} />
              <span>{group.member_count ?? 0} Members</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-gray-500">
            Group details, expenses, balances, and chat will appear here.
          </p>
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4 flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;