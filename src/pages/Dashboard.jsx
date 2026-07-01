import React from "react";

import TopNavbar from "../components/dashboard/TopNavbar";
import BottomNavbar from "../components/dashboard/BottomNavbar";
import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentExpenses from "../components/dashboard/RecentExpenses";

const Dashboard = () => {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-blue-50
      via-white
      to-green-50
      pb-24
    "
    >
      <TopNavbar />

      <main className="px-5 pt-6">
        <h2
          className="
          text-2xl
          font-bold
        "
        >
          Dashboard 👋
        </h2>

        <p
          className="
          text-gray-500
          mt-1
        "
        >
          Track your expenses
        </p>

        <BalanceCard />

        <QuickActions />

        <RecentExpenses />
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Dashboard;
