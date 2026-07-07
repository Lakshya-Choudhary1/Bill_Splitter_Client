import React from "react";
import { X, IndianRupee } from "lucide-react";
import settlementStore from "../../store/settlement.store";

const PendingSettlementModel = ({ isOpen, onClose }) => {
  const { pendingSettlement, acceptSettlement, rejectSettlement } =
    settlementStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Pending Settlements
            </h2>

            <p className="text-sm text-gray-500">Review settlement requests</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[500px] space-y-4 overflow-y-auto p-6">
          {pendingSettlement.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No pending settlements.
            </div>
          ) : (
            pendingSettlement.map((settlement) => (
              <div
                key={settlement.id}
                className="rounded-2xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {settlement.from_user_name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {settlement.expense_title}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(settlement.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center text-lg font-bold text-blue-600">
                    <IndianRupee size={18} />
                    {settlement.amount}
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => acceptSettlement(settlement.id)}
                    className="flex-1 rounded-xl bg-emerald-600 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => rejectSettlement(settlement.id)}
                    className="flex-1 rounded-xl bg-red-600 py-2.5 font-semibold text-white transition hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingSettlementModel;
