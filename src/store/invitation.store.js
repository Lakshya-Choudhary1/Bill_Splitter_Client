import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

const invitationStore = create((set, get) => ({
  notifications: [],
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get("/invitation");
      console.log("Fetched notifications successfully:", response.data);
      if (response.data.success) {
        set({ notifications: response.data.invitations });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications.");
    }
  },
  acceptInvitation: async (invitationId) => {
    try {
      const response = await axiosInstance.post(
        `/invitation/${invitationId}/accept`,
      );

      if (response.data.success) {
        await get().getNotifications();

        const groupStore = require("./group.store").default;
        await groupStore.getState().getAllgroups();

        toast.success("Invitation accepted successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept invitation.");
    }
  },
  rejectInvitation: async (invitationId) => {
    try {
      const response = await axiosInstance.post(
        `/invitation/${invitationId}/reject`,
      );
      if (response.data.success) {
        toast.success("Invitation rejected successfully.");
        get().getNotifications();
      }
    } catch (error) {
      console.error("Error rejecting invitation:", error);
      toast.error("Failed to reject invitation.");
    }
  },
}));

export default invitationStore;
