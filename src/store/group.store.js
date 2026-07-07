import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

const groupStore = create((set, get) => ({
  groups: [],
  selectedGroup: null,
  selectedGroupMembers: [],
  currentMember: null,
  setCurrentMember: (member) => set({ currentMember: member }),
  setGroups: (groups) => set({ groups }),
  setSelectedGroupMembers: (members) => set({ selectedGroupMembers: members }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  createGroup: async ({ name, description, currency }) => {
    try {
      const response = await axiosInstance.post("/group/create", {
        name,
        description,
        currency,
      });
      const newGroup = response.data.group;
      set((state) => ({
        groups: [...state.groups, newGroup],
      }));
      toast.success("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create group. Please try again.",
      );
    }
  },
  getAllgroups: async () => {
    try {
      const response = await axiosInstance.get("/group/all");
      const groups = response.data.groups;
      set({ groups });
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch groups. Please try again.",
      );
    }
  },
  getGroupMembers: async (groupId) => {
    try {
      const response = await axiosInstance.get(`/group/${groupId}/member`);
      const members = response.data.members;
      set({ selectedGroupMembers: members });
    } catch (error) {
      console.error("Error fetching group members:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch group members. Please try again.",
      );
    }
  },
  getCurrentMember: async (groupId) => {
    try {
      const response = await axiosInstance.get(`/group/${groupId}/user`);
      const currentMember = response.data.member;
      set({ currentMember });
    } catch (error) {
      console.error("Error fetching current member:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch current member. Please try again.",
      );
    }
  },
  addMember: async (groupId, memberId) => {
    try {
      ///:groupId/member/:memberId
      const response = await axiosInstance.post(
        `/invitation/group/${groupId}/invite`,
        { memberId },
      );

      toast.success(response.data.message || "Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add member. Please try again.",
      );
    }
  },
  deleteGroup: async (groupId) => {
    try {
      const id = groupId;
      const response = await axiosInstance.delete(`/group/${id}`);
      if (response.data.success) {
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
          selectedGroup: null,
        }));
        toast.success("Group deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete group. Please try again.",
      );
    }
  },
  leaveGroup: async (groupId) => {
    try {
      const response = await axiosInstance.delete(`/group/${groupId}/leave`);
      if (response.data.success) {
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== groupId),
          selectedGroup: null,
        }));
        toast.success("You have left the group successfully!");
      }
    } catch (error) {
      console.error("Error leaving group:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to leave group. Please try again.",
      );
    }
  },
  updateGroup: async (id, formData) => {
    try {
      const response = await axiosInstance.patch(`/group/${id}`, formData);
      if (response.data.success) {
        const updatedGroup = response.data.group;
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === id ? updatedGroup : group,
          ),
        }));
        set({ selectedGroup: updatedGroup });
        toast.success("Group updated successfully!");
      }
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update group. Please try again.",
      );
    }
  },
  removeMember: async (groupId, memberId) => {
    try {
      const response = await axiosInstance.delete(
        `/group/${groupId}/member/${memberId}`,
      );

      if (response.data.success) {
        set((state) => ({
          selectedGroupMembers: state.selectedGroupMembers.filter(
            (member) => member.user_id !== memberId,
          ),
        }));
        toast.success("Member removed successfully!");
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove member. Please try again.",
      );
    }
  },
}));

export default groupStore;
