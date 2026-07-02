import React, { useEffect, useState } from "react";

import TopNavbar from "../components/dashboard/TopNavbar";
import BottomNavbar from "../components/dashboard/BottomNavbar";
import Home from "../components/Home.jsx";
import History from "../components/History.jsx";
import Profile from "../components/Profile.jsx";
import Groups from "../components/Groups.jsx";
import expenseStore from "../store/expense.store.js";
import invitationStore from "../store/invitation.store.js"
import settlementStore from "../store/settlement.store.js";
import groupStore from "../store/group.store.js";

const Dashboard = () => {
  const [selectPage, setSelectPage] = useState("home");
  const {getRecentExpenses,getOweExpenses,getOwedExpenses,getAllExpenses} = expenseStore();
  const {getAllSettlements} = settlementStore();
  const {getNotifications} = invitationStore();
  const {getAllgroups} = groupStore();

  useEffect(() => {

    getRecentExpenses();
    getOwedExpenses();
    getOweExpenses();
    getNotifications();
    getAllExpenses();
    getAllSettlements();
    getAllgroups();

  }, [getRecentExpenses]);

  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-blue-50
      via-white
      to-green-50
      pb-24
    "
    >
      <TopNavbar />

      {selectPage === "home" && <Home />}
      {selectPage === "history" && <History />}
      {selectPage === "profile" && <Profile />}
      {selectPage === "groups" && <Groups />}

      <BottomNavbar selectPage={selectPage}  setSelectPage={setSelectPage} />
    </div>
  );
};

export default Dashboard;
