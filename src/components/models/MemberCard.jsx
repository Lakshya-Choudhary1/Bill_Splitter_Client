import React, { useRef, useEffect } from "react";
import {
  Crown,
  MoreVertical,
  User,
  UserMinus,
} from "lucide-react";

const MemberCard = ({
  member,
  isAdmin,
  isCurrentUser,
  isGroupAdmin,
  openMenu,
  setOpenMenu,
  onViewMember,
  onRemoveMember,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (openMenu === member.id) {
          setOpenMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [openMenu, member.id, setOpenMenu]);

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
      <div className="flex items-center gap-3">
        {member.avatar_url ? (
          <img
            src={member.avatar_url}
            alt={member.name}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {member.name[0]}
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{member.name}</span>

            {isAdmin && (
              <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                <Crown size={12} />
                Admin
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">{member.email}</p>
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() =>
            setOpenMenu(openMenu === member.id ? null : member.id)
          }
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <MoreVertical size={20} />
        </button>

        {openMenu === member.id && (
          <div className="absolute right-0 top-11 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
            <button
              onClick={() => {
                setOpenMenu(null);
                onViewMember(member);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
            >
              <User size={18} />
              View Profile
            </button>

            {isGroupAdmin && !isCurrentUser && (
              <button
                onClick={() => {
                  setOpenMenu(null);
                  onRemoveMember(member.id);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
              >
                <UserMinus size={18} />
                Remove Member
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;