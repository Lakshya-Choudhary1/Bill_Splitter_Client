import React, { useEffect, useState } from "react";
import { Users, ArrowLeft, MoreVertical, PlusIcon } from "lucide-react";

import GroupDetailsModal from "./GroupDetailsModal.jsx";
import groupStore from "../../store/group.store.js";
import expenseStore from "../../store/expense.store.js";
import Chats from "./Chats.jsx";
import CreateExpenseModel from "./CreateExpenseModel.jsx";

const GroupChatModal = ({ isOpen, onClose }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [createExpenseOpen, setCreateExpenseOpen] = useState(false);

  const {
    selectedGroup,
    getGroupMembers,
    getCurrentMember,
    selectedGroupMembers,
    currentMember,
  } = groupStore();

  const { getGroupExpenses, groupExpenses } = expenseStore();

  const group = selectedGroup;

  useEffect(() => {
    if (!group?.id) return;

    getGroupMembers(group.id);
    getCurrentMember(group.id);
    getGroupExpenses(group.id);
  }, [group?.id]);

  if (!isOpen || !group) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-60 flex justify-center bg-black/20"
        onClick={onClose}
      >
        <div
          className="relative flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition hover:bg-white/20"
                >
                  <ArrowLeft size={22} />
                </button>

                <div>
                  <h2 className="text-lg font-bold">{group.name}</h2>

                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <Users size={15} />
                    <span>{selectedGroupMembers.length} Members</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDetailsOpen(true)}
                className="rounded-full p-2 transition hover:bg-white/20"
              >
                <MoreVertical size={22} />
              </button>
            </div>
          </div>

          {/* Chat */}
          <Chats
            groupExpenses={groupExpenses}
            currentMember={currentMember}
          />

          {/* Floating Add Expense Button */}
          <button
            onClick={() => setCreateExpenseOpen(true)}
            className="absolute bottom-6 left-1/2 z-50 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-blue-700 active:scale-95"
          >
            <PlusIcon size={30} strokeWidth={3} />
          </button>
        </div>
      </div>

      <CreateExpenseModel
        isOpen={createExpenseOpen}
        onClose={() => setCreateExpenseOpen(false)}
      />

      <GroupDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
};

export default GroupChatModal;