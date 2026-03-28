import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { listenMessages } from "@/features/chat/services/messageService";
import { MessageId } from "@/models";

export function useChatMessages(
  chatId: string | undefined,
  scrollViewRef: React.RefObject<ScrollView | null>,
) {
  const [messages, setMessages] = useState<MessageId[]>([]);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!chatId) return;

    unsubscribeRef.current?.();
    unsubscribeRef.current = listenMessages(chatId, (msgs) => {
      setMessages(msgs);
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