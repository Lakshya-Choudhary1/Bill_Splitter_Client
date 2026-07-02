import React from "react";
import expenseStore from "../../store/expense.store";

const RecentExpenses = () => {
  const { recentExpenses } = expenseStore();

  return (
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
      <h3 className="text-lg font-bold mb-4">Recent Expenses</h3>

      {!recentExpenses || recentExpenses.length === 0 ? (
        <p className="text-gray-400 text-sm">No recent expenses</p>
      ) : (
        recentExpenses.map((el) => (
          <Expense
            key={el.id}
            title={el.title}
            amount={el.amount}
            currency={el.currency}
          />
        ))
      )}
    </div>
  );
};

const Expense = ({ title, amount, currency }) => (
  <div
    className="
    flex
    justify-between
    py-3
    border-b
    border-gray-200
    "
  >
    <span className="font-medium">{title}</span>

    <span className="text-red-500 font-semibold">
      -{currency} {amount}
    </span>
  </div>
);

export default RecentExpenses;
