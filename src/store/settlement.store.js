import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

const settlementStore = create((set, get) => ({
  allSettlements: [],
  totalReceived: 0,
  settlementRequests: [],
  pendingSettlement: [],
  getTotalReceived: async () => {
    try {
      const response = await axiosInstance.get("/settlement/total-received");

      if (response.data.success) {
        console.log("totalReceived:", response.data.totalReceived);
        set({ totalReceived: response.data.totalReceived });
      }
    } catch (error) {
      console.error("Error fetching total amount settled:", error);
      toast.error("Failed to fetch total amount settled.");
    }
  },
  getAllSettlements: async () => {
    try {
      const response = await axiosInstance.get("/settlement");
      if (response.data.success) {
        console.log("All Settlements:", response.data.settlements);
        set({ allSettlements: response.data.settlements });
      }
    } catch (error) {
      console.error("Error fetching all settlements:", error);
      toast.error("Failed to fetch all settlements.");
    }
  },
  createSettlement: async (expenceId, groupId) => {
    try {
      const response = await axiosInstance.post(
        `settlement/group/${groupId}/expence/${expenceId}`,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        get().getAllSettlements();
      }
    } catch (error) {
      console.error("Error Creating settlement", error);
      toast.error("Failed to Create settlement.");
    }
  },
  acceptSettlement: async (settlementId) => {
    try {
      const response = await axiosInstance.get(
        `settlement/accept/${settlementId}`,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        get().getAllPendingSettlement();
        get().getAllSettlements();
        get().getTotalReceived()
      }
    } catch (error) {
      console.error("Error Creating settlement", error);
      toast.error("Failed to Create settlement.");
    }
  },
  rejectSettlement: async (settlementId) => {
    try {
      const response = await axiosInstance.get(
        `settlement/reject/${settlementId}`,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        get().getAllPendingSettlement();
        get().getAllSettlements();
      }
    } catch (error) {
      console.error("Error Rejecting settlement", error);
      toast.error("Failed to Reject settlement.");
    }
  },
  getAllPendingSettlement: async () => {
    try {
      const response = await axiosInstance.get(`/settlement/pending`);
      if (response.data.success) {
        set({ pendingSettlement: response.data.settlements });
      }
    } catch (error) {
      console.error("Error Rejecting settlement", error);
      toast.error("Failed to Reject settlement.");
    }
  },
}));

export default settlementStore;
