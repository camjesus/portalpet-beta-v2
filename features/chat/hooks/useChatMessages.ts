import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { listenMessages } from "@/features/chat/services/messageService";
import { MessageId } from "@/models";

export function useChatMessages(
  chatId: string | undefined,
  scrollViewRef: React.RefObject<ScrollView | null>,
  deletedAt?: any,
) {
  const [messages, setMessages] = useState<MessageId[]>([]);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!chatId) return;

    unsubscribeRef.current?.();
    unsubscribeRef.current = listenMessages(chatId, (msgs) => {
      const filtered = deletedAt
        ? msgs.filter((m) => m.message.createAt && m.message.createAt.seconds > deletedAt.seconds)
        : msgs;
      setMessages(filtered);
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    });

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [chatId]);

  return { messages };
}