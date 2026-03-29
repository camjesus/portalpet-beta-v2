import { useEffect, useRef, useState } from "react";
import {
  collection, query, where, onSnapshot, orderBy, limit, Timestamp,
} from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { useNotification } from "@/context/NotificationContext";
import { useAuthStore } from "@/store/authStore";
import { markChatAsRead } from "@/features/chat/repository/chatRepository";

interface UseGlobalChatListenerOptions {
  userId: string | undefined;
}

export function useGlobalChatListener({ userId }: UseGlobalChatListenerOptions) {
  const { showNotification } = useNotification();
  const seenMessageIds = useRef<Set<string>>(new Set());
  const initializedChats = useRef<Set<string>>(new Set());
  const messageUnsubs = useRef<Map<string, () => void>>(new Map());
  const unreadMap = useRef<Map<string, boolean>>(new Map());
  const [hasUnreadGlobal, setHasUnreadGlobal] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const chatUnsubs: (() => void)[] = [];

 const queries = [
  query(collection(db, "chats"), where("user.id", "==", userId), orderBy("createDate", "asc")),
  query(collection(db, "chats"), where("rescuer.id", "==", userId), orderBy("createDate", "asc")),
];

      queries.forEach((q, queryIndex) => {
        const unsub = onSnapshot(q, (chatsSnapshot) => {  
        chatsSnapshot.docs.forEach((chatDoc) => {
          const chatId = chatDoc.id;
          const data = chatDoc.data();
          const activeChatId = useAuthStore.getState().activeChatId;
          const isActiveChat = chatId === activeChatId;
          const isRescuer = data.rescuer?.id === userId;
          const hasUnread = isRescuer ? data.hasUnreadRescuer : data.hasUnreadUser; 
          // Si el chat está activo y llega hasUnread true, re-marcarlo como leído
          if (isActiveChat && hasUnread) {
            markChatAsRead(chatId, isRescuer);
          }

          unreadMap.current.set(`${queryIndex}-${chatId}`, isActiveChat ? false : !!hasUnread);
console.log([...unreadMap.current.entries()]);
setHasUnreadGlobal(Array.from(unreadMap.current.values()).some(Boolean));
          // Suscribir mensajes solo una vez por chat
          if (messageUnsubs.current.has(chatId)) return;

          const messagesQuery = query(
            collection(db, "messages"),
            where("chatId", "==", chatId),
            orderBy("createAt", "desc"),
            limit(1),
          );

          const unsubMessages = onSnapshot(messagesQuery, (messagesSnapshot) => {
            if (!initializedChats.current.has(chatId)) {
              initializedChats.current.add(chatId);
              messagesSnapshot.docs.forEach((doc) => seenMessageIds.current.add(doc.id));
              return;
            }

            messagesSnapshot.docChanges().forEach((change) => {
              if (change.type !== "added") return;
              const messageId = change.doc.id;
              const message = change.doc.data();
              const currentActiveChatId = useAuthStore.getState().activeChatId;

              if (
                seenMessageIds.current.has(messageId) ||
                message.sender?.id === userId ||
                chatId === currentActiveChatId
              ) {
                seenMessageIds.current.add(messageId);
                return;
              }

              seenMessageIds.current.add(messageId);
              const createdAt: Timestamp | undefined = message.createAt;
              const time = createdAt ? formatTime(createdAt.toDate()) : undefined;
              showNotification({
                senderName: message.sender?.name ?? "Nuevo mensaje",
                message: message.text ?? "Te enviaron un mensaje",
                chatId,
                time,
              });
            });
          });

          messageUnsubs.current.set(chatId, unsubMessages);
        });
      });

      chatUnsubs.push(unsub);
    });

    return () => {
      chatUnsubs.forEach((unsub) => unsub());
      messageUnsubs.current.forEach((unsub) => unsub());
      seenMessageIds.current.clear();
      initializedChats.current.clear();
      messageUnsubs.current.clear();
      unreadMap.current.clear();
    };
  }, [userId]);

  return { hasUnreadGlobal };
}

function formatTime(date: Date): string {
  const diffSecs = (Date.now() - date.getTime()) / 1000;
  if (diffSecs < 60) return "ahora";
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m`;
  return date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}