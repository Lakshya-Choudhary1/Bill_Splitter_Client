import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import expenseStore from "../../store/expense.store.js";

const BalanceCard = () => {
  const { totalOwed, totalOwe} = expenseStore();

  const balance = Number(totalOwed ?? 0) - Number(totalOwe ?? 0);

  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl">
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className=" grid grid-cols-2 gap-4">
        {/* You Owe */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-red-500/15 p-2">
              <ArrowUpRight size={18} className="text-red-400" />
            </div>

            <span className="text-sm text-slate-300">You Owe</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white">
            ₹{Number(totalOwe ?? 0).toLocaleString("en-IN")}
          </h3>
        </div>

        {/* You Are Owed */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-500/15 p-2">
              <ArrowDownLeft size={18} className="text-emerald-400" />
            </div>

            <span className="text-sm text-slate-300">You Are Owed</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white">
            ₹{Number(totalOwed ?? 0).toLocaleString("en-IN")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
