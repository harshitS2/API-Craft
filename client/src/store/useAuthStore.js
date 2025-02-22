import { axiosInstance } from '../api/axios.js';
import { create } from "zustand";
import toast from "react-hot-toast";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
            toast.error("Not logged in");
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        try {
            set({ isLoggingIn: true });

            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Signed up successfully");
            set({ authUser: res.data });

            return res.data; // Return the response data
        } catch (error) {
            console.log("Error in signin:", error);
            toast.error("Error While Signing in");
            throw error; // Propagate error to the caller
        } finally {
            set({ isLoggingIn: false });
        }
    },
    login: async (data) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("/auth/login", data);
            toast.success("Logged in successfully");
            set({ authUser: res.data });
            return res.data; // Return the response data
        } catch (error) {
            console.log("Error in login:", error);
            toast.error("Invalid credentials");
            throw error; // Propagate error to the caller
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logged out");
            set({ authUser: null });
        } catch (error) {
            console.log("Error in logOut:", error);
            toast.error("Failed to log out");
        }
    },
}));