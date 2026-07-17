import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

import uploadToCloudinary from "../services/cloudinary.js";

const userStore = create((set, get) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/profile");

      if (res.data.user) {
        get().setUser(res.data.user);
        toast.success(`Welcome ${res.data.user.name} 👋.`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: async ({ email, password }) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      if (res.data.user) {
        get().setUser(res.data.user);
        toast.success(`Welcome back ${res.data.user.name}`);
      }
    } catch (error) {
      get().setUser(null);
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  register: async ({ name, email, password, upiId }) => {
    try {
      const res = await axiosInstance.post("/user/register", {
        name,
        email,
        password,
        upi_id: upiId,
      });

      if (res.data.user) {
        get().setUser(res.data.user);
        toast.success(`OTP has been sent to ${email}`);
      }
    } catch (error) {
      get().setUser(null);
      toast.error(error.response?.data?.message || "Register failed");
    }
  },
  verifyEmail: async (token) => {
    try {
      const { data } = await axiosInstance.post("/user/verifyEmail", {
        token,
      });

      if (data.success) {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                is_verified: true,
              }
            : null,
        }));

        toast.success(data.message);
        return true;
      }

      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Verify email failed");
      return false;
    }
  },

  resendVerifyEmailToken: async () => {
    try {
      const user = get().user;
      console.log(user);
      if (!user?.email) {
        toast.error("User email not found");
        return;
      }

      const res = await axiosInstance.post("/user/resendVerifyEmailToken", {
        email: user.email,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Resend verification failed",
      );
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await axiosInstance.post("/user/forgot-password", {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Forgot password failed");
    }
  },
  resetPassword: async (token, password) => {
    try {
      const res = await axiosInstance.post("/user/reset-password", {
        password,
        token,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Forgot password failed");
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/user/logout");
      get().clearUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
  updateUser: async (formData) => {
    const user = get().user;
    try {
      const res = await axiosInstance.patch("/user/profile", {
        name: formData.name,
        upi_id: formData.upi_id,
        currency: formData.currency,
      });
      if (res.data.success) {
        get().setUser(res.data.user);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update profile failed");
      set({ user: user });
    }
  },
  updateAvatar: async (avatar) => {
    const user = get().user;
    try {
      let avatar_url;
      try {
        avatar_url = await uploadToCloudinary(avatar);
      } catch (error) {
        toast.error("Failed to upload avatar");
        return;
      }

      if (!avatar_url) {
        toast.error("Failed to upload avatar");
        return;
      }

      const res = await axiosInstance.patch("/user/avatar", { avatar_url });
      if (res.data.success) {
        get().setUser(res.data.user);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update avatar failed");
      set({ user: user });
    }
  },
}));

export default userStore;
