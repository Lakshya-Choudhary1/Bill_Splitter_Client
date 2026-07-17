import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { serverUrl } from "../../../config/config";
import userStore from "../../store/user.store";
import toast from "react-hot-toast";
import Loading from "../../components/layout/Loading.jsx";

const Login = () => {
  const { login } = userStore();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    await login({ email: loginForm.email, password: loginForm.password });
    setIsLoading(false);
    setLoginForm({ email: "", password: "" });
  };

  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-blue-100/80
      via-white
      to-green-100/80
      px-5
      flex
      items-center
      "
    >
      <div
        className="
        w-full
        bg-white
        rounded-3xl
        shadow-xl
        p-6
        "
      >
        <ArrowLeft onClick={() => navigate("/")} className="cursor-pointer" />

        <div className="text-center">
          <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>

          <p className="text-gray-500 text-sm">
            Login to your BillSplit account
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div
            className="
            flex items-center gap-3
            border border-gray-400
            rounded-xl px-4 py-3
          "
          >
            <Mail size={20} className="text-blue-600" />

            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              placeholder="Email"
              className="
                outline-none
                w-full
              "
            />
          </div>

          <div
            className="
            flex items-center gap-3
            border border-gray-400
            rounded-xl px-4 py-3
          "
          >
            <Lock size={20} className="text-blue-600" />

            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              placeholder="Password"
              className="
                outline-none
                w-full
              "
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600">
              Forgot password?
            </Link>
          </div>

          <button
            disabled={isLoading}
            className="
              w-full
              py-3
              rounded-xl
              bg-linear-to-br
              from-blue-500
              to-green-500
              text-white
              font-semibold
              flex
              items-center
              justify-center
            "
          >
            {isLoading ? <Loading /> : "Login"}
          </button>
        </form>

        <div
          className="
          flex items-center gap-3 my-6
        "
        >
          <div className="h-px bg-gray-200 flex-1" />

          <span className="text-sm text-gray-400">OR</span>

          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <a
          href={`${serverUrl}/user/google`}
          className="
          w-full
          py-3
          border
          border-gray-400/80
          rounded-xl
          flex
          items-center
          justify-center
          gap-3
          "
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
          Continue with Google
        </a>

        <p
          className="
          text-center
          text-sm
          text-gray-500
          mt-6
        "
        >
          Don't have an account?
          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              ml-1
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
