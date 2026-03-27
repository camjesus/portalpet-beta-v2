import { useEffect, useState } from "react";
import { ChatId, User } from "@/models";
import { getChatsAsync } from "@/features/chat/services/chatService";

export function useChatList() {
  const [chats, setChats] = useState<ChatId[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  return { chats, user };
}