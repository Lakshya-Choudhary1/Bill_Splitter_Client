import React, { useState } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";

import groupStore from "../../store/group.store.js";

const AddMemberForm = ({ isOpen, onClose }) => {
  const [memberId, setMemberId] = useState("");

  const { addMember, selectedGroup } = groupStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberId.trim()) return;

    await addMember(selectedGroup.id, memberId);

    setMemberId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-85 bg-black/50 flex justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-107.5 h-80 rounded-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} className="text-blue-600" />
          </button>

          <h2 className="text-lg font-bold">Add Member</h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between p-5"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Member Email or Code
              </label>

              <input
                type="text"
                placeholder="Enter member email or code"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            <p className="text-sm text-gray-500">
              Enter the registered email address of the user you want to add to
              this group.
            </p>
          </div>

          <button
            type="submit"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            <UserPlus size={20} />
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
