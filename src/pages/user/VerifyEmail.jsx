import React, { useRef, useState, useEffect } from "react";
import { ArrowLeftIcon, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import userStore from "../../store/user.store.js";
import Loading from "../../components/layout/Loading.jsx";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();
  const inputs = useRef([]);

  const { verifyEmail, resendVerifyEmailToken, clearUser } = userStore();

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (value, index) => {

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    const newOtp = ["", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const focusIndex = Math.min(pasted.length, 4) - 1;
    inputs.current[focusIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const token = otp.join("");

    if (token.length !== 4) {
      toast.error("Enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const success = await verifyEmail(token);

      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    await resendVerifyEmailToken();
    setResendTimer(30);
  };

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 via-white to-green-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100">
        <button className="p-1 mb-4" onClick={handleLogout}>
          <ArrowLeftIcon className="text-gray-600" />
        </button>

        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-2xl bg-linear-to-br from-blue-600 to-green-500">
            <Mail size={32} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Verify Email
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter the 4-digit code sent to your email
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onPaste={handlePaste}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="w-full mt-3 text-end px-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className={`${
                resendTimer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-3 rounded-xl text-white font-semibold bg-linear-to-r from-blue-600 to-green-500 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loading/> : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
