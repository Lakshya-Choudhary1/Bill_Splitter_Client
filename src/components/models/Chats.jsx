import React, { useEffect, useRef, useState } from "react";
import SettleModel from "./SettleModel";

const Chats = ({ groupExpenses, currentMember }) => {
  const chatRef = useRef(null);
  const [settleOpen, setSettleOpen] = useState(false);
  const [expenseSettle, setExpenseSettle] = useState(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [groupExpenses]);

  const handleSettlement = (expence) => {
    setSettleOpen(true);
    setExpenseSettle(expence);
  };

  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto bg-gray-50 p-4 pb-20">
      {groupExpenses.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No expenses yet.
        </div>
      ) : (
        groupExpenses.map((expense) => {
          const isMe = expense.paid_by_id === currentMember?.id;

          return (
            <div
              key={expense.id}
              className={`mb-5 flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {/* Left Avatar */}
              {!isMe && (
                <div className="mr-3 mt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                    {expense.paid_by_name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              {/* Expense Card */}
              <div className="inline-block w-full max-w-60 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                {/* Name */}
                {!isMe && (
                  <p className="mb-2 text-sm font-semibold text-indigo-600">
                    {expense.paid_by_name}
                  </p>
                )}

                {/* Title & Amount */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {expense.title}
                    </h3>

                    {expense.description && (
                      <p className="mt-1 text-sm text-gray-600">
                        {expense.description}
                      </p>
                    )}
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 whitespace-nowrap">
                    ₹{expense.amount}
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-gray-500">
                    {new Date(expense.created_at).toLocaleString()}
                  </span>

                  {isMe && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      You Paid
                    </span>
                  )}
                </div>

                {/* Settlement Section */}
                {!isMe && (
                  <div className="mt-4">
                    {expense.settled ? (
                      <div className="flex justify-end">
                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                          ✅ Settled
                        </span>
                      </div>
                    ) : (
                      <>
                        <p className="mb-3 text-sm text-gray-600">
                          You owe{" "}
                          <span className="font-semibold text-red-600">
                            ₹{expense.amount_owed}
                          </span>
                        </p>

                        <button
                          onClick={() => handleSettlement(expense)}
                          className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
                        >
                          💸 Settle ₹{expense.amount_owed}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Right Avatar */}
              {isMe && (
                <div className="ml-3 mt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    Y
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <SettleModel
        isOpen={settleOpen}
        onClose={() => {
          setSettleOpen(false);
          setExpenseSettle(null);
        }}
        expense={expenseSettle}
      />
    </div>
  );
};

export default Chats;
