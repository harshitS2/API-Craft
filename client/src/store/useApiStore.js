import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../api/axios";

export const useApiStore = create((set, get) => ({
    apis: [],

    getApis: async () => {
        try {
            const res = await axiosInstance.get("/apis");
            set({ apis: res.data });
        } catch (error) {
            console.error("Error fetching APIs:", error);
            set({ apis: [] });
            toast.error("Failed to fetch APIs");
        }
    },

    getAPIById: async (id) => {
        try {
            const res = await axiosInstance.get(`/apis/${id}`);
            return res.data;
        } catch (error) {
            console.error(`Error fetching API with ID ${id}:`, error);
            toast.error("Failed to fetch API details");
            return null;
        }
    },
    getApiBySchemaName: async(schemaName)=>{
        try {
            const res = await axiosInstance.get(`/apis/schema/${schemaName}`);
            return res.data;
        } catch (error) {
            console.error(`Error fetching API with Schema Name ${schemaName}:`, error);
            toast.error("Failed to fetch API details");
            return null;
        }
    },
    createApi: async (apiData) => {
        try {
            const res = await axiosInstance.post("/", apiData);
            set((state) => ({ apis: [...state.apis, res.data] }));
            toast.success("API created successfully");
            return res.data;
        } catch (error) {
            console.error("Error creating API:", error);
            toast.error("Failed to create API");
        }
    },

    deleteApi: async (id) => {
        try {
            await axiosInstance.delete(`/${id}`);
            set((state) => ({ apis: state.apis.filter((api) => api._id !== id) }));
            toast.success("API deleted successfully");
        } catch (error) {
            console.error(`Error deleting API with ID ${id}:`, error);
            toast.error("Failed to delete API");
        }
    },
}));
