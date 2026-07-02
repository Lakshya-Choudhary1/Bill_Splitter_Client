import React from "react";
import { X, Bell } from "lucide-react";
import invitationStore from "../store/invitation.store.js";

const Notification = ({ isOpen, onClose }) => {
  const { notifications,acceptInvitaion, rejectInvitation } = invitationStore();

  if (!isOpen) return null;

  return (
    <div
      className="
        absolute
        right-0
        top-12
        z-50
        w-80
        rounded-2xl
        bg-white
        shadow-xl
        border
        border-gray-100
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-b-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
            <Bell size={18} />
          </div>

          <h2 className="font-semibold">Notifications</h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <X size={17} />
        </button>
      </div>

      {/* Body */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">
                    Group Invitation
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{item.invited_by_name}</span>{" "}
                    invited you to join{" "}
                    <span className="font-semibold text-blue-600">
                      {item.group_name}
                    </span>
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                {item.status === "pending" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-1 animate-pulse" />
                )}
              </div>

              {/* Status / Buttons */}
              <div className="mt-4">
                {item.status === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptInvitation(item.id)}
                      className="
                flex-1
                py-2
                rounded-lg
                bg-green-500
                hover:bg-green-600
                text-white
                text-sm
                font-medium
                transition
              "
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => rejectInvitation(item.id)}
                      className="
                flex-1
                py-2
                rounded-lg
                bg-red-500
                hover:bg-red-600
                text-white
                text-sm
                font-medium
                transition
              "
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`
              inline-flex
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              ${
                item.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
