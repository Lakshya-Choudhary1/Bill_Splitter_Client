import React, { useState } from "react";

import TopNavbar from "../components/dashboard/TopNavbar";
import BottomNavbar from "../components/dashboard/BottomNavbar";
import Home from "../components/Home.jsx";
import Expense from "../components/Expense.jsx";
import Profile from "../components/Profile.jsx";
import Groups from "../components/Groups.jsx";

const Dashboard = () => {
  const [selectPage, setSelectPage] = useState("home");

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
      {selectPage === "expense" && <Expense />}
      {selectPage === "profile" && <Profile />}
      {selectPage === "groups" && <Groups />}

      <BottomNavbar selectPage={selectPage}  setSelectPage={setSelectPage} />
    </div>
  );
};

export default Dashboard;
