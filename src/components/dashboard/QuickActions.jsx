import React, { useState } from "react";
import { Receipt, IndianRupee } from "lucide-react";
import settlementStore from "../../store/settlement.store.js";
import PendingSettlementModel from "../models/PendingSettlementModel.jsx";

const QuickActions = () => {
  const { totalReceived, pendingSettlement } = settlementStore();

  const [openSettlementModal, setOpenSettlementModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Total Settled Card */}
        <div className="col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-5 text-white shadow-lg">
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-100">Total Settled Amount</p>

              <h2 className="mt-2 flex items-center gap-1 text-3xl font-bold">
                <IndianRupee size={24} />
                {Number(totalReceived).toLocaleString("en-IN")}
              </h2>

              <p className="mt-2 text-xs text-emerald-100">
                Successfully received
              </p>
            </div>

            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
              <Receipt size={34} />
            </div>
          </div>
        </div>

        {/* Settlements */}
        <button
          onClick={() => setOpenSettlementModal(true)}
          className="relative flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {(pendingSettlement?.length ?? 0) > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white shadow">
              {pendingSettlement.length > 99 ? "99+" : pendingSettlement.length}
            </span>
          )}

          <div className="rounded-full bg-blue-100 p-3">
            <Receipt className="text-blue-600" size={26} />
          </div>

          <p className="mt-3 text-sm font-semibold text-gray-800">
            Settlements
          </p>
        </button>
      </div>

      <PendingSettlementModel
        isOpen={openSettlementModal}
        onClose={() => setOpenSettlementModal(false)}
      />
    </>
  );
};

export default QuickActions;
