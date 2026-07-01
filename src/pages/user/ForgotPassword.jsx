import React, { use, useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import userStore from "../../store/user.store.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  const {forgotPassword} = userStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Enter your email");
      return;
    }

    setLoading(true);
    forgotPassword(email);
    setLoading(false);
    navigator("/");
    
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
            p-4 rounded-2xl
            bg-linear-to-br
            from-blue-600
            to-green-500
          "
          >
            <Mail size={32} className="text-white" />
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
          Forgot Password?
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mt-2
          mb-8
        "
        >
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Mail
              size={20}
              className="
                absolute
                left-4
                top-3.5
                text-blue-500
              "
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link
          to="/login"
          className="
            flex
            justify-center
            items-center
            gap-2
            mt-6
            text-sm
            text-gray-500
            hover:text-blue-600
          "
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
