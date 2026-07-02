import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";


const settlementStore = create((set, get) => ({
     allSettlements: [],
     getAllSettlements: async () => {
          try {
               const response = await axiosInstance.get("/settlement");
               if(response.data.success){
                    set({ allSettlements: response.data.settlements });
               }
          }
          catch (error) {
               console.error("Error fetching all settlements:", error);
               toast.error("Failed to fetch all settlements.");
          }
     }
}));

export default settlementStore;
