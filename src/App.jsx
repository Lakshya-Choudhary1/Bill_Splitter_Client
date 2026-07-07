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

// Protect routes that require an authenticated user session.
const AuthenticatedRoute = ({ children, requireVerification = true }) => {
  const { user, authLoading } = userStore();

  if (authLoading) {
    return <Loading />;
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Route requires verified user (Dashboard)
  if (requireVerification && !user.is_verified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Route requires unverified user (Verify Email)
  if (!requireVerification && user.is_verified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const RedirectRoute = ({ children }) => {
  const { user, authLoading } = userStore();

  if (authLoading) {
    return <Loading />;
  }

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
  }, [checkAuth]);

  if (authLoading) {
    return (
      <MobileFrame>
        <Loading />
      </MobileFrame>
    );
  }

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
          path="/verify-email"
          element={
            <AuthenticatedRoute requireVerification={false}>
              <VerifyEmail />
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
          path="/forgot-password"
          element={
            <RedirectRoute>
              <ForgotPassword />
            </RedirectRoute>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectRoute>
              <ResetPassword />
            </RedirectRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MobileFrame>
  );
};

export default App;
