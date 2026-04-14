import { useEffect, useState, useMemo } from "react";
import { ChatId, User } from "@/models";
import { getChatsAsync } from "@/features/chat/services/chatService";
import { ChatSortType } from "@/components/chatList/ChatSortModal";

export function useChatList() {
  const [chats, setChats] = useState<ChatId[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  return { chats: sortedChats, user, sort, setSort, showSortModal, setShowSortModal };
}