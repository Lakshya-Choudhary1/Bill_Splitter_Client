import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Wallet, ArrowLeft } from "lucide-react";
import { serverUrl } from "../../../config/config";
import userStore from "../../store/user.store";
import toast from "react-hot-toast";
import Loading from "../../components/layout/Loading";

const Register = () => {
  const { register } = userStore();
  const [isLoading, setIsLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    upiId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (
      !registerForm.name.trim() ||
      !registerForm.email.trim() ||
      !registerForm.password.trim() ||
      !registerForm.upiId.trim()
    ) {

      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try{
       setIsLoading(true);
      await register(registerForm);
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
    }finally{
      setIsLoading(false);
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        upiId: "",
      });
    }
 
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
        <ArrowLeft
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer"
        />

        <div className="text-center">
          <h1
            className="
            mt-4
            text-2xl
            font-bold
          "
          >
            Create Account
          </h1>

          <p className="text-gray-500 text-sm">Join BillSplit today</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Name */}

          <Input
            icon={<User size={20} />}
            name="name"
            value={registerForm.name}
            onChange={handleChange}
            placeholder="Full name"
            className="border-gray-400/80"
          />

          {/* Email */}
          <Input
            icon={<Mail size={20} />}
            name="email"
            value={registerForm.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />

          {/* Password */}

          <Input
            icon={<Lock size={20} />}
            name="password"
            value={registerForm.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />

          {/* UPI */}

          <Input
            icon={<Wallet size={20} />}
            name="upiId"
            value={registerForm.upiId}
            onChange={handleChange}
            placeholder="UPI ID"
          />

          <button
            disabled={isLoading}
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-linear-to-br
              from-blue-500
              to-green-500
              text-white
              font-semibold
            "
          >
            {isLoading ? <Loading /> : "Register"}
          </button>
        </form>

        <div
          className="
          flex
          items-center
          gap-3
          my-6
        "
        >
          <div className="h-px bg-gray-200 flex-1" />

          <span className="text-gray-400 text-sm">OR</span>

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
          Already have account?
          <Link
            to="/login"
            className="
            text-blue-600
            font-semibold
            ml-1
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const Input = ({ icon, name, value, onChange, placeholder, type = "text" }) => (
  <div
    className="
    flex
    items-center
    gap-3
    border
    border-gray-400/80
    rounded-xl
    px-4
    py-3
  "
  >
    <span className="text-blue-600">{icon}</span>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}

      required
      minLength={name == "password" ? 6 : null}
      maxLength={name == ""? "" : null}
      className="
        outline-none
        w-full
      "
    />
  </div>
);

export default Register;
