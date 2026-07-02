import React from "react";
import { Home, Wallet, Users, User } from "lucide-react";

const BottomNavbar = ({ setSelectPage, selectPage }) => {
  return (
    <nav
      className="
      fixed
      bottom-4
      left-1/2
      -translate-x-1/2
      w-[calc(100%-32px)]
      max-w-100
      h-16
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-xl
      grid
      grid-cols-4
      items-center
      z-50
    "
    >
      <NavItem
        icon={<Home size={20} />}
        text="Home"
        active={selectPage === "home"}
        onClick={() => setSelectPage("home")}
      />

      <NavItem
        icon={<Wallet size={20} />}
        text="History"
        active={selectPage === "history"}
        onClick={() => setSelectPage("history")}
      />

      <NavItem
        icon={<Users size={20} />}
        text="Groups"
        active={selectPage === "groups"}
        onClick={() => setSelectPage("groups")}
      />

      <NavItem
        icon={<User size={20} />}
        text="Profile"
        active={selectPage === "profile"}
        onClick={() => setSelectPage("profile")}
      />
    </nav>
  );
};


const NavItem = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative
      h-full
      flex
      flex-col
      items-center
      justify-center
      text-[11px]
      gap-1
      transition-all
      duration-300
      ease-out
      ${
        active
          ? "text-blue-600 scale-110"
          : "text-gray-400 scale-100 hover:scale-105"
      }
    `}
  >

    {/* icon animation */}
    <div
      className={`
        transition-all
        duration-300
        ${
          active
            ? "-translate-y-1 rotate-6"
            : "translate-y-0 rotate-0"
        }
      `}
    >
      {icon}
    </div>


    <span
      className={`
        transition-all
        duration-300
        ${
          active
            ? "font-semibold"
            : "font-normal"
        }
      `}
    >
      {text}
    </span>


    {/* active dot */}
    <span
      className={`
        absolute
        bottom-1
        w-1.5
        h-1.5
        rounded-full
        bg-blue-600
        transition-all
        duration-300
        ${
          active
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0"
        }
      `}
    />
  </button>
);

export default BottomNavbar;