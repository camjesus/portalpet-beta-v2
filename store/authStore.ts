import { create } from "zustand";
import { User } from "@/models";

interface AuthStore {
  user: User | null;
  activeChatId: string | null;

  setUser: (user: User | null) => void;
  setActiveChatId: (chatId: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  activeChatId: null,

  setUser: (user) => set({ user }),
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
}));
