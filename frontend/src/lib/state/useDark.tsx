import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface DarkMode {
  dark: boolean;
  toggleDarkMode: () => void;
}

const handleDark = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const useDark = create(persist<DarkMode>(
  (set, get) => ({
    dark: false,
    toggleDarkMode: () => {
      const currentDark = get().dark;
      const newDark = !currentDark;
      handleDark(newDark);
      set({ dark: newDark });
    },
  }),
  {
    name: "dark-mode",
    storage: {
      getItem: (name) => {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
      },
      setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
      removeItem: (name) => localStorage.removeItem(name),
    },
  }
));
