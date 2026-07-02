import React from "react";
import expenseStore from "../../store/expense.store.js";

const BalanceCard = () => {

  const {totalOwed,totalOwe} = expenseStore();

  return <div className="mt-6 p-6 rounded-3xl text-white bg-linear-to-r from-blue-600 to-green-500 shadow-lg">
    <p>Total Balance</p>
    <h1 className="text-4xl font-bold mt-3">
      ₹24,560
    </h1>

    <div className="flex justify-between mt-6">
      <div>
        <p className="text-sm opacity-80">You owe</p>
        <b>₹{`${totalOwe}`}</b>
      </div>

      <div>
        <p
          className="text-sm opacity-80">
          You owed
        </p>
        <b>₹{`${totalOwed}`}</b>
      </div>
    </div>
  </div>
};

export default BalanceCard;
