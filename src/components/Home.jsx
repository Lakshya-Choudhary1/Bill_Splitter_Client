import React from "react";

import BalanceCard from "./dashboard/BalanceCard.jsx";
import QuickActions from "./dashboard/QuickActions.jsx";
import RecentExpenses from "./dashboard/RecentExpenses.jsx";

const Home = () => {
  return (
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
  );
};

export default Home;
