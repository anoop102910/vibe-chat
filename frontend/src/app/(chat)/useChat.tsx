import {create} from "zustand";
import { IUser, IMessage } from "@/index";

interface ChatState {
  currUser: IUser | null;
  setCurrUser: (user: IUser) => void;
}

export const useChat = create<ChatState>((set) => ({
  currUser: null,
  setCurrUser: (user) => set({ currUser: user }),
}));