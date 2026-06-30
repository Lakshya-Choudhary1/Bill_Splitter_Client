import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

const userStore = create((set, get) => ({
  user: null,

  setUser: (user) => set({user}),

  clearUser: () => set({ user: null}),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/profile");

      if (res.data.user) {
        get().setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
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

        toast.success("Account created");
      }
    } catch (error) {
      get().setUser(null);

      toast.error(error.response?.data?.message || "Register failed");
    }
  },
}));

export default userStore;
