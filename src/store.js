import { create } from "zustand";

export const useStore = create((set) => ({
  input: "",
  setInput: (input) => set({ input }),

  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
  setUser: (user) => set({ user }),
}));
