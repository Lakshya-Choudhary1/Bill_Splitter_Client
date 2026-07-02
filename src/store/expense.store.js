import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";


const expenseStore = create((set, get) => ({
     recentExpenses: [],
     allExpenses: [],
     totalOwed: 0,
     totalOwe: 0,
     getRecentExpenses: async () => {
          try {
               const response = await axiosInstance.get("/expense/recent");
               set({ recentExpenses: response.data.expenses });
          }
          catch (error) {
               console.error("Error fetching recent expenses:", error);
               toast.error("Failed to fetch recent expenses.");
          }
     },
     getOweExpenses: async () => {
          try{
               const response = await axiosInstance.get("/expense/get-owe");
               if(response.data.success){
                    set({ totalOwe: response.data.totalOwe });
               }
          }
          catch (error) {
               console.error("Error fetching owe expenses:", error);
               toast.error("Failed to fetch owe expenses.");
          }
     },
     getOwedExpenses: async () => {
          try{
               const response = await axiosInstance.get("/expense/get-owed");
               if(response.data.success){
                    set({ totalOwed: response.data.totalOwed });
               }
          }
          catch (error) {
               console.error("Error fetching owed expenses:", error);
               toast.error("Failed to fetch owed expenses.");
          }
     },
     getAllExpenses: async () => {
          try {
               const response = await axiosInstance.get("/expense");
               if(response.data.success){
                    set({ allExpenses: response.data.expenses });
               }
          }
          catch (error) {
               console.error("Error fetching all expenses:", error);
               toast.error("Failed to fetch all expenses.");
          }
     }
}));

export default expenseStore;
