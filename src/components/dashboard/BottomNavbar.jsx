import React from "react";
import { Home, Wallet, Users, User } from "lucide-react";

const BottomNavbar = () => {
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
      border-gray-400
      shadow-lg
      grid
      grid-cols-4
      items-center
      z-50
    "
    >
      <NavItem icon={<Home size={20} />} text="Home" active />

      <NavItem icon={<Wallet size={20} />} text="Expense" />

      <NavItem icon={<Users size={20} />} text="Groups" />

      <NavItem icon={<User size={20} />} text="Profile" />
    </nav>
  );
};

const NavItem = ({ icon, text, active }) => (
  <div
    className={`
    flex
    flex-col
    items-center
    justify-center
    text-[11px]
    gap-1

    ${active ? "text-blue-600" : "text-gray-400"}

  `}
  >
    {icon}

    <span>{text}</span>
  </div>
);

export default BottomNavbar;
