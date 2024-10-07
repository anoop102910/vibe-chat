import {create} from "zustand";
import { IUser, IMessage } from "@/index";

interface ChatState {
  currUser: IUser | null;
  setCurrUser: (user: IUser | null) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
}

export const useChat = create<ChatState>((set) => ({
  currUser: null,
  setCurrUser: (user) => set({ currUser: user }),
  isProfileOpen: false,
  setIsProfileOpen: (isOpen) => set({ isProfileOpen: isOpen }),
}));