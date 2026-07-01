import React, { useState } from "react";
import { Bell, User, LogOut } from "lucide-react";

import userStore from "../../store/user.store.js";

const TopNavbar = () => {
  const [open, setOpen] = useState(false);
  const { user , logout } = userStore();

  return (
    <header
      className="
      sticky
      top-0
      z-30
      h-16
      bg-linear-to-br
      from-blue-50
      via-white
      to-green-50
      backdrop-blur
      border-b
      border-gray-200
      px-5
      flex
      items-center
      justify-between
    "
    >
      {/* Logo */}

      <h1
        className="
        text-xl
        font-bold
        bg-linear-to-r
        from-blue-600
        to-green-500
        text-transparent
        bg-clip-text
      "
      >
        BillSplit
      </h1>

      {/* Actions */}

      <div
        className="
        flex
        gap-3
        relative
      "
      >
        {/* Notification */}

        <button
          className="
          p-2
          rounded-xl
          bg-gray-100
          hover:bg-gray-200
          transition
        "
        >
          <Bell size={20} />
        </button>

        {/* Profile Button */}

        <button
          onClick={() => setOpen(!open)}
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

        {/* Profile Dropdown */}

        {open && (
          <div
            className="
            absolute
            right-0
            top-12
            w-48
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-gray-100
            p-3
            animate-in
            fade-in
            slide-in-from-top-2
          "
          >
            {/* User Section */}

            <div
              className="
              flex
              items-center
              gap-3
              p-2
            "
            >
              <div
                className="
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                bg-linear-to-r
                from-blue-600
                to-green-500
                text-white
                font-bold
              "
              >
                {user.avatar_url ? (
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={user.avatar_url}
                    alt="profile"
                  />
                ) : (
                  user.name[0]
                )}
              </div>

              <div>
                <p
                  className="
                  font-semibold
                  text-sm
                "
                >
                  Lakshya
                </p>

                <p
                  className="
                  text-xs
                  text-gray-400
                "
                >
                  Account
                </p>
              </div>
            </div>

            <div
              className="
              h-px
              bg-gray-100
              my-3
            "
            />

            {/* Logout */}

            <button
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
              font-medium
            "
                onClick={async ()=> await logout()}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
