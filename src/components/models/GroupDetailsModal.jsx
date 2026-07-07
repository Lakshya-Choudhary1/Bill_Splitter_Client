import React, { useState } from "react";
import { ArrowLeft, SquarePen, UserPlus, LogOut, Trash2 } from "lucide-react";

import MemberCard from "./MemberCard.jsx";
import AddMemberForm from "./AddMemberForm.jsx";

import groupStore from "../../store/group.store.js";
import EditGroupForm from "./EditGroupForm.jsx";

const GroupDetailsModal = ({ isOpen, onClose }) => {
  const {
    selectedGroup,
    selectedGroupMembers,
    currentMember,
    deleteGroup,
    leaveGroup,
    removeMember
  } = groupStore();

  const [openMemberMenu, setOpenMemberMenu] = useState(null);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);

  const group = selectedGroup;

  if (!isOpen || !group) return null;

  const members = selectedGroupMembers || [];
  const isAdmin = currentMember?.role === "admin";

  const onEditGroup = () => {};

  const onViewMember = (member) => {
    console.log(member);
  };

  const onRemoveMember = async(memberId) => {
    await removeMember(group.id,memberId)
  };

  const onLeaveGroup = async () => {
    await leaveGroup(selectedGroup.id);
  };

  const onDeleteGroup = async () => {
    await deleteGroup(selectedGroup.id);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-80 bg-black/50 flex justify-center"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-107.5 h-screen flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-2 border-b border-gray-200">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ArrowLeft size={22} className="text-blue-600" />
            </button>

            <h2 className="font-semibold text-lg text-black/90 tracking-wide">
              {group.name}
            </h2>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="px-4 pt-4 space-y-2">
              <button
                onClick={() => setEditGroupOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <SquarePen size={20} className="text-blue-600" />
                <span>Edit Group</span>
              </button>

              <button
                onClick={() => setAddMemberOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <UserPlus size={20} className="text-blue-600" />
                <span>Add Members</span>
              </button>
            </div>
          )}

          {/* Members */}
          <div className="flex-1 overflow-y-auto px-4 mt-5">
            <h3 className="font-semibold mb-3">Members ({members.length})</h3>

            <div className="space-y-3">
              {
              
              members.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  No members found.
                </div>
              ) : (
                 
                members.map((member, index) => {
                  return (
                    <MemberCard
                      key={member.id}
                      member={member}
                      isAdmin={member?.role === "admin"}
                      isCurrentUser={member?.id === currentMember?.id}
                      isGroupAdmin={isAdmin}
                      openMenu={openMemberMenu}
                      setOpenMenu={setOpenMemberMenu}
                      onViewMember={onViewMember}
                      onRemoveMember={onRemoveMember}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <button
              onClick={onLeaveGroup}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-orange-600 hover:bg-orange-50 transition"
            >
              <LogOut size={20} />
              <span>Leave Group</span>
            </button>

            {isAdmin && (
              <button
                onClick={onDeleteGroup}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 size={20} />
                <span>Delete Group</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AddMemberForm
        isOpen={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
      />

      <EditGroupForm
        isOpen={editGroupOpen}
        onClose={() => setEditGroupOpen(false)}
        group={selectedGroup}
      />
    </>
  );
};

export default GroupDetailsModal;
