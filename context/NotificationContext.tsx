// context/NotificationContext.tsx
// Contexto global para mostrar notificaciones desde cualquier pantalla

import React, { createContext, useCallback, useContext, useState } from "react";
import { router } from "expo-router";
import {
  ChatNotificationContainer,
  ChatNotificationData,
} from "@/components/chat/ChatNotification";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface NotificationContextValue {
  showNotification: (data: Omit<ChatNotificationData, "id">) => void;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<ChatNotificationData[]>(
    [],
  );

  const showNotification = useCallback(
    (data: Omit<ChatNotificationData, "id">) => {
      const id = `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      setNotifications((prev) => [...prev, { ...data, id }]);
    },
    [],
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handlePress = useCallback((notification: ChatNotificationData) => {
    // Navega al chat al tocar la notificación
    router.push({
      pathname: "/chat",
      params: {
        chatId: notification.chatId,
        ...(notification.petString
          ? { petString: notification.petString }
          : {}),
      },
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ChatNotificationContainer
        notifications={notifications}
        onDismiss={dismissNotification}
        onPress={handlePress}
      />
    </NotificationContext.Provider>
  );
}

// ─── Hook de acceso ───────────────────────────────────────────────────────────

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotification debe usarse dentro de NotificationProvider",
    );
  return ctx;
}
