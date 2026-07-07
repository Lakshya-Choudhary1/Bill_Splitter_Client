import React, { useState } from "react";
import {
  ChevronRight,
  Plus,
} from "lucide-react";

import CreateGroupModal from "../components/models/CreateGroupModal.jsx";
import GroupChatModal from "../components/models/GroupChatModal.jsx";
import groupStore from "../store/group.store.js";

const Groups = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const { groups , selectedGroup , setSelectedGroup } = groupStore();

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setChatOpen(true);
  };

  return (
    <>
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Groups</h1>

            <p className="text-gray-500 text-sm">
              Manage your shared expense groups
            </p>
          </div>

          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
          >
            <Plus size={18} />
            Create
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-4">
          {groups.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              No groups yet.
            </div>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                onClick={() => handleGroupClick(group)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer p-5 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-md">
                    {group.name}
                  </h2>
                </div>

                <ChevronRight
                  size={22}
                  className="text-gray-400"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      {/* Group Chat Modal */}
      <GroupChatModal
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setSelectedGroup(null);
        }}
      />
    </>
  );
};

export default Groups;