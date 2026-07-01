import React from "react";

const RecentExpenses = () => (
  <div
    className="
mt-8
bg-white
rounded-3xl
p-5
border
border-gray-300
shadow-sm
"
  >
    <h3
      className="
text-lg
font-bold
mb-4
"
    >
      Recent Expenses
    </h3>

    <Expense title="Dinner" amount="₹1200" />

    <Expense title="Trip" amount="₹5600" />

    <Expense title="Shopping" amount="₹2300" />
  </div>
);

const Expense = ({ title, amount }) => (
  <div
    className="
flex
justify-between
py-3
border-b
border-gray-300
"
  >
    <span>{title}</span>

    <span
      className="
text-red-500
font-semibold
"
    >
      -{amount}
    </span>
  </div>
);

export default RecentExpenses;
