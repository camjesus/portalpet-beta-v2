import { useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"; 
import { db } from "@/FirebaseConfig";
import { useNotification } from "@/context/NotificationContext";

interface UseGlobalChatListenerOptions {
  userId: string | undefined;
  activeChatId?: string | null;
}

export function useGlobalChatListener({
  userId,
  activeChatId = null,
}: UseGlobalChatListenerOptions) {
  const { showNotification } = useNotification();
  const seenMessageIds = useRef<Set<string>>(new Set());
  const initializedChats = useRef<Set<string>>(new Set());
  const activeChatIdRef = useRef(activeChatId);

  useEffect(() => {
    if (!userId) return;
    const unsubscribers: (() => void)[] = [];

    const qUser = query(
      collection(db, "chats"),
      where("user.id", "==", userId),
      orderBy("createDate", "asc"),
    );

    const qRescuer = query(
      collection(db, "chats"),
      where("rescuer.id", "==", userId),
      orderBy("createDate", "asc"),
    );

    [qUser, qRescuer].forEach((chatQuery) => {
      const unsub = onSnapshot(chatQuery, (chatsSnapshot) => {
        chatsSnapshot.docs.forEach((chatDoc) => {
          const chatId = chatDoc.id;

          const messagesQuery = query(
            collection(db, "messages"),
            where("chatId", "==", chatId),
            orderBy("createAt", "desc"),
            limit(1),
          );

          const unsubMessages = onSnapshot(
            messagesQuery,
            (messagesSnapshot) => {
              if (!initializedChats.current.has(chatId)) {
                initializedChats.current.add(chatId);
                messagesSnapshot.docs.forEach((doc) => {
                  seenMessageIds.current.add(doc.id);
                });
                return;
              }
              messagesSnapshot.docChanges().forEach((change) => {
                if (change.type !== "added") return;

                const messageId = change.doc.id;
                const message = change.doc.data();

                if (
                  seenMessageIds.current.has(messageId) ||
                  message.sender?.id === userId ||
                  chatId === activeChatIdRef.current
                ) {
                  seenMessageIds.current.add(messageId);
                  return;
                }

                seenMessageIds.current.add(messageId);

                const createdAt: Timestamp | undefined = message.createAt;
                const time = createdAt
                  ? formatTime(createdAt.toDate())
                  : undefined;

                showNotification({
                  senderName: message.sender?.name ?? "Nuevo mensaje",
                  message: message.text ?? "Te enviaron un mensaje",
                  chatId,
                  time,
                });
              });
            },
          );

          unsubscribers.push(unsubMessages);
        });
      });

      unsubscribers.push(unsub);
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
      seenMessageIds.current.clear();
      initializedChats.current.clear();
    };
  }, [userId]);

    useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);
}

function formatTime(date: Date): string {
  const diffSecs = (Date.now() - date.getTime()) / 1000;
  if (diffSecs < 60) return "ahora";
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m`;
  return date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}
