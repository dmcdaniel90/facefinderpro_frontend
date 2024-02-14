import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";

const initialState = {
  input: "",
  imageUrl: "",
  boundingBox: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

export const useStore = create(
  immer((set) => ({
    ...initialState,
    setInput: (input) => set({ input }),
    setImageUrl: (imageUrl) => set({ imageUrl }),
    setBoundingBox: (boundingBox) => set({ boundingBox }),
    setRoute: (route) => set({ route }),
    setIsSignedIn: (isSignedIn) => set({ isSignedIn }),

    setUser: (user) => set({ user }),
    setUserEntries: ({ entries }) =>
      set(
        produce((state) => {
          state.user.entries = entries;
        }),
      ),
    logout: () => set({ ...initialState }),
  })),
);
