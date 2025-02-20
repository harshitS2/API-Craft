import { create } from "zustand";

const useApiStore = create((set) => ({
  apis: [], // List of created APIs
  addApi: (api) => set((state) => ({ apis: [...state.apis, api] })),
  removeApi: (id) => set((state) => ({ apis: state.apis.filter((api) => api.id !== id) })),
}));

export default useApiStore;
