import { create } from "zustand";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";


const groupStore = create((set, get) => ({
     groups: [],
     createGroup: async ({name,description,currency}) => {
          try {
               const response = await axiosInstance.post("/group/create", {name,description,currency});
               const newGroup = response.data.group;
               console.log("Group created successfully:", newGroup);
               set((state) => ({
                    groups: [...state.groups, newGroup],
               }));
               toast.success("Group created successfully!");
          } catch (error) {
               console.error("Error creating group:", error);
               toast.error(error.response?.data?.message || "Failed to create group. Please try again.");
          }
     },
     getAllgroups: async() =>{
          try{
               const response = await axiosInstance.get("/group/all");
               const groups = response.data.groups;
               console.log("Fetched groups successfully:", groups);
               set({groups});

          }catch(error){
               console.error("Error fetching groups:", error);
               toast.error(error.response?.data?.message || "Failed to fetch groups. Please try again.");
          }
     }
}));

export default groupStore;
