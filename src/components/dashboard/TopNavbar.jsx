import React, { useMemo, useState } from "react";
import { Bell, User, LogOut } from "lucide-react";

import userStore from "../../store/user.store.js";
import invitationStore from "../../store/invitation.store.js";
import Notification from "../Notification.jsx";

const TopNavbar = () => {
  const [open, setOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { notifications } = invitationStore();
  const { user, logout } = userStore();

  // Count only pending invitations
 

  return (
    <header
      className="
        sticky top-0 z-30 h-16
        bg-linear-to-br from-blue-50 via-white to-green-50
        backdrop-blur
        border-b border-gray-200
        px-5
        flex items-center justify-between
      "
    >
      {/* Logo */}
      <h1
        className="
          text-xl font-bold
          bg-linear-to-r from-blue-600 to-green-500
          text-transparent bg-clip-text
        "
      >
        BillSplit
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-3 relative">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="
              relative
              p-2
              rounded-xl
              bg-gray-100
              hover:bg-gray-200
              transition
            "
          >
            <Bell size={20} />

            {/* Notification Count Badge */}
            {invitationStore.length > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-5
                  h-5
                  px-1
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-white
                  text-[10px]
                  font-bold
                  border-2
                  border-white
                  shadow-md
                "
              >
                {notifications.length > 99 ? "99+" : notifications.length}
              </span>
            )}
          </button>

          <Notification
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
              p-2
              rounded-xl
              bg-green-100
              text-green-600
              hover:scale-105
              transition
            "
          >
            <User size={20} />
          </button>

          {open && (
            <div
              className="
                absolute
                right-0
                top-12
                w-66
                bg-white
                rounded-2xl
                shadow-xl
                border
                border-gray-100
                p-3
              "
            >
              <div className="flex items-center gap-3 p-2">
                <div
                  className="
                    w-11
                    h-11
                    rounded-full
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    bg-linear-to-r
                    from-blue-600
                    to-green-500
                    text-white
                    font-bold
                    text-lg
                  "
                >
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="my-3 h-px bg-gray-100" />

              <button
                onClick={async () => {
                  setOpen(false);
                  await logout();
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2.5
                  rounded-xl
                  text-red-500
                  hover:bg-red-50
                  transition
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
