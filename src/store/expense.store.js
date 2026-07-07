import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

const expenseStore = create((set, get) => ({
  recentExpenses: [],
  allExpenses: [],
  groupExpenses: [],
  totalOwed: 0,
  totalOwe: 0,
  getRecentExpenses: async () => {
    try {
      const response = await axiosInstance.get("/expense/recent");
      set({ recentExpenses: response.data.expenses });
    } catch (error) {
      console.error("Error fetching recent expenses:", error);
      toast.error("Failed to fetch recent expenses.");
    }
  },
  getOweExpenses: async () => {
    try {
      const response = await axiosInstance.get("/expense/get-owe");
      if (response.data.success) {
        set({ totalOwe: response.data.totalOwe });
      }
    } catch (error) {
      console.error("Error fetching owe expenses:", error);
      toast.error("Failed to fetch owe expenses.");
    }
  },
  getOwedExpenses: async () => {
    try {
      const response = await axiosInstance.get("/expense/get-owed");
      if (response.data.success) {
        set({ totalOwed: response.data.totalOwed });
      }
    } catch (error) {
      console.error("Error fetching owed expenses:", error);
      toast.error("Failed to fetch owed expenses.");
    }
  },
  getAllExpenses: async () => {
    try {
      const response = await axiosInstance.get("/expense");
      if (response.data.success) {
        set({ allExpenses: response.data.expenses });
      }
    } catch (error) {
      console.error("Error fetching all expenses:", error);
      toast.error("Failed to fetch all expenses.");
    }
  },
  createExpense: async (groupId, { title, description, amount }) => {
    try {
      const response = await axiosInstance.post(`/expense/group/${groupId}`, {
        title,
        description,
        amount,
      });

      if (response.data.success) {
        toast.success("Expense created successfully.");
        set((state) => ({
          groupExpenses: [
            ...state.groupExpenses,
            response.data.detailedExpense,
          ],
        }));
        get().getAllExpenses();
        get().getOweExpenses();
        get().getOwedExpenses();
        get().getRecentExpenses();
      }
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Failed to create expense.");
    }
  },
  getGroupExpenses: async (groupId) => {
    try {
      const response = await axiosInstance.get(`/expense/group/${groupId}`);
      if (response.data.success) {
        set({ groupExpenses: response.data.expenses });
      }
    } catch (error) {
      console.error("Error fetching group expenses:", error);
      toast.error("Failed to fetch group expenses.");
    }
  },
  createGroupExpense: async (groupId, { title, description, amount }) => {
    try {
      const response = await axiosInstance.post(`/expense/group/${groupId}`, {
        title,
        description,
        amount,
      });
      if (response.data.success) {
        toast.success("Expense created successfully.");
        const detailedExpense = response.data.detailedExpense;
        // Optionally, you can update the groupExpenses state with the new expense
        set((state) => ({
          groupExpenses: [...state.groupExpenses, detailedExpense],
        }));
        // Refresh the list of all expenses
        get().getAllExpenses();
      }
    } catch (error) {
      console.error("Error creating group expense:", error);
      toast.error("Failed to create group expense.");
    }
  },
}));

export default expenseStore;
