import React from "react";
import { Wallet, Users, Receipt } from "lucide-react";

const QuickActions = () => (
  <div
    className="grid grid-cols-3 gap-3 mt-6">
    <Action icon={<Wallet size={22} />} text="Wallet" />

    <Action icon={<Users size={22} />} text="Group" />

    <Action icon={<Receipt size={22} />} text="Settlements" />
  </div>
);

const Action = ({ icon, text }) => (
  <div className="bg-white rounded-2xl border border-gray-300 p-4 text-center" >
    <div className="flex justify-center text-blue-600"
    >
      {icon}
    </div>
    <p className="text-sm mt-2">{text}</p>
  </div>
);

export default QuickActions;
