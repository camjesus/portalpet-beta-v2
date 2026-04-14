import { useEffect, useState, useMemo } from "react";
import { ChatId, User } from "@/models";
import { getChatsAsync } from "@/features/chat/services/chatService";
import { ChatSortType } from "@/components/chatList/ChatSortModal";
import { softDeleteChat } from "../repository/chatRepository";

export function useChatList() {
  const [chats, setChats] = useState<ChatId[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [sort, setSort] = useState<ChatSortType>("recent");
  const [showSortModal, setShowSortModal] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    getChatsAsync((chats) => {
      setChats(chats);
    }).then((res) => {
      setUser(res?.user);
      unsub = res?.unsub;
    });

    return () => unsub?.();
  }, []);


  const sortedChats = useMemo(() => {
    if (sort === "recent") {
      return [...chats].sort((a, b) =>
        (b.chat.lastMessageAt?.seconds ?? 0) - (a.chat.lastMessageAt?.seconds ?? 0)
      );
    }
    if (sort === "pending") {
      return [...chats].sort((a, b) => {
        const aPending = a.chat.adoptionStatus === "pending" ? 0 : 1;
        const bPending = b.chat.adoptionStatus === "pending" ? 0 : 1;
        return aPending - bPending;
      });
    }
    if (sort === "action") {
      return [...chats].sort((a, b) =>
        a.chat.pet.action.localeCompare(b.chat.pet.action)
      );
    }
    return chats;
  }, [sort, chats]);

  const handleDeleteChat = async (chatId: string, userId: string) => {
    setShowDelete(false);
    if (!chatId || !userId) return;
    await softDeleteChat(chatId, userId);
    setChats(chats.filter((chat) => chat.id !== chatId));
  };

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleLongPress = (chatId: string) => {
    setSelectedChatId(chatId);
    setShowDelete(true);
  };

  return { chats: sortedChats, user, sort, setSort, showSortModal, setShowSortModal, handleLongPress, showDelete, setShowDelete, handleDeleteChat, selectedChatId };
}