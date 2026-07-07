import React from "react";
import QRCode from "react-qr-code";
import { Copy, X, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";

import settlementStore from "../../store/settlement.store.js";
import groupStore from "../../store/group.store.js";

const SettleModel = ({ isOpen, onClose, expense }) => {
  const { createSettlement } = settlementStore();
  const { selectedGroup } = groupStore();

  if (!isOpen || !expense) return null;

  const upiId = expense.paid_by_upi_id; // Receiver's UPI ID
  const payeeName = expense.paid_by_name;

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName,
  )}&am=${expense.amount_owed}&cu=INR`;

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      toast.success("UPI ID copied!");
    } catch (err) {
      console.error(err);
    }
  };

  const onInitiate = (expense) => {
    createSettlement(expense.id, selectedGroup.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Settle Expense</h2>
            <p className="text-sm text-gray-500">
              Scan the QR or copy the UPI ID
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center px-6 py-6">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <QRCode value={upiLink} size={220} />
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">Amount to Pay</p>

            <div className="mt-1 flex items-center justify-center gap-1 text-3xl font-bold text-blue-600">
              <IndianRupee size={28} />
              {expense.amount_owed}
            </div>
          </div>

          <div className="mt-6 w-full rounded-xl border p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Receiver
            </p>

            <p className="mt-1 font-semibold">{payeeName}</p>

            <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <span className="truncate font-medium text-gray-700">
                {upiId}
              </span>

              <button
                onClick={copyUpi}
                className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-5">
          <button
            onClick={() => onInitiate(expense)}
            className="w-full rounded-xl bg-emerald-600 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700"
          >
            Initiate Settlement
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettleModel;
