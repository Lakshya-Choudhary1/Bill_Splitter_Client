import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import userStore from "./store/user.store.js";
import MobileFrame from "./components/layout/MobileFrame.jsx";
import Loading from "./components/layout/Loading.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/user/Login.jsx";
import Register from "./pages/user/Register.jsx";
import VerifyEmail from "./pages/user/VerifyEmail.jsx";
import ForgotPassword from "./pages/user/ForgotPassword.jsx";
import ResetPassword from "./pages/user/ResetPassword.jsx";

const AuthenticatedRoute = ({ children }) => {
  const { user, authLoading } = userStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_verified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectRoute = ({ children }) => {
  const { user, authLoading } = userStore();

  if (user?.is_verified) {
    return <Navigate to="/dashboard" replace />;
  }

  if (user && !user.is_verified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const App = () => {
  const { checkAuth, authLoading } = userStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <MobileFrame>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <Dashboard />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />

        <Route
          path="/register"
          element={
            <RedirectRoute>
              <Register />
            </RedirectRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            
              <VerifyEmail />
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:id" element={<ResetPassword />} />
      </Routes>
    </MobileFrame>
  );
};

export default App;
