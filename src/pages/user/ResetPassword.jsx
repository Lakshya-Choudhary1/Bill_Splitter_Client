import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import toast from "react-hot-toast";

import userStore from "../../store/user.store.js";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const { resetPassword } = userStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    await resetPassword(token, password);
    setLoading(false);
  };

  return (
    <div
      className="
      min-h-screen
      flex items-center justify-center
      bg-linear-to-r
      from-blue-100
      via-white
      to-green-100
      px-4
    "
    >
      <div
        className="
        bg-white
        w-full max-w-md
        p-8
        rounded-3xl
        shadow-xl
        border border-gray-100
      "
      >
        <div className="flex justify-center mb-5">
          <div
            className="
            p-4
            rounded-2xl
            bg-linear-to-br
            from-blue-600
            to-green-500
          "
          >
            <LockKeyhole size={32} className="text-white" />
          </div>
        </div>

        <h1
          className="
          text-3xl
          font-bold
          text-center
          text-gray-900
        "
        >
          Reset Password
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mt-2
          mb-8
        "
        >
          Create your new password
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <LockKeyhole
              size={20}
              className="
                absolute
                left-4
                top-3.5
                text-blue-500
              "
            />

            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                py-3
                pl-12
                pr-4
                rounded-xl
                border
                border-gray-200
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div className="relative">
            <LockKeyhole
              size={20}
              className="
                absolute
                left-4
                top-3.5
                text-green-500
              "
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full
                py-3
                pl-12
                pr-4
                rounded-xl
                border
                border-gray-200
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          <button
            disabled={loading}
            className="
              mt-6
              w-full
              py-3
              rounded-xl
              text-white
              font-semibold
              bg-linear-to-r
              from-blue-600
              to-green-500
              hover:opacity-90
            "
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
