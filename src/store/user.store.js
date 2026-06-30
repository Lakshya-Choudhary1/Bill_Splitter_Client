import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import axios from "axios";
import toast from "react-hot-toast";

const userStore = create((set, get) => ({
  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  clearUser: () =>
    set({
      user: null,
    }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      console.log(res.data)
      if (res.data.user) {
        get().setUser(res.data.user);
        toast.success("Welcome back!");
      }
      toast.success("No user");
    } catch (error) {
      console.log(error);
      get().setUser(null);
      toast.error(error.response?.data?.message || "Authentication failed");
    }
  },
}));

export default userStore;
