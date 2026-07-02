import React, { useState } from "react";
import { Receipt, ArrowLeftRight } from "lucide-react";
import expenseStore from "../store/expense.store";
import settlementStore from "../store/settlement.store";

const History = () => {
  const { allExpenses } = expenseStore();
  const { allSettlements } = settlementStore();

  const [tab, setTab] = useState("expenses");

  return (
    <div className="p-5">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-5">History</h1>

      {/* Toggle Buttons */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
        <button
          onClick={() => setTab("expenses")}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            tab === "expenses"
              ? "bg-white shadow text-blue-600"
              : "text-gray-500"
          }`}
        >
          Expenses
        </button>

        <button
          onClick={() => setTab("settlements")}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            tab === "settlements"
              ? "bg-white shadow text-green-600"
              : "text-gray-500"
          }`}
        >
          Settlements
        </button>
      </div>

      {/* Expenses */}
      {tab === "expenses" && (
        <div className="space-y-3">
          {allExpenses.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No expenses found.
            </div>
          ) : (
            allExpenses.map((expense) => (
              <div
                key={expense.id}
                className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-4
            flex
            justify-between
            items-center
            hover:shadow-md
            transition
          "
              >
                <div className="flex gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <Receipt size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {expense.title}
                    </h3>

                    {expense.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {expense.description}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      Paid by{" "}
                      <span className="font-medium">
                        {expense.paid_by_name}
                      </span>
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(expense.created_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-600 text-lg">
                    {expense.currency} {Number(expense.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Settlements */}
      {tab === "settlements" && (
        <div className="space-y-3">
          {allSettlements.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No settlements found.
            </div>
          ) : (
            allSettlements.map((settlement) => (
              <div
                key={settlement.id}
                className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-4
            flex
            justify-between
            items-center
            hover:shadow-md
            transition
          "
              >
                <div className="flex gap-3">
                  <div className="p-3 rounded-xl bg-green-100 text-green-600">
                    <ArrowLeftRight size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {settlement.from_user_name} → {settlement.to_user_name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {settlement.payment_method
                        ? `Paid via ${settlement.payment_method.toUpperCase()}`
                        : "Settlement completed"}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(settlement.created_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">
                    {settlement.currency} {Number(settlement.amount).toFixed(2)}
                  </p>

                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      settlement.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : settlement.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {settlement.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default History;
