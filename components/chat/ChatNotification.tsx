// components/chat/ChatNotification.tsx
// Pop-up de notificación de nuevo mensaje - adaptado a tu proyecto

import React, { useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

export interface ChatNotificationData {
  id: string;
  senderName: string;
  message: string;
  chatId: string;
  petString?: string;
  time?: string;
}

// ─── Item individual de notificación ────────────────────────────────────────

interface NotificationItemProps {
  notification: ChatNotificationData;
  onDismiss: (id: string) => void;
  onPress?: (notification: ChatNotificationData) => void;
}

function ChatNotificationItem({
  notification,
  onDismiss,
  onPress,
}: NotificationItemProps) {
  const translateY = useRef(new Animated.Value(-110)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // Entrada desde arriba
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 70,
        friction: 11,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    // Barra de progreso
    Animated.timing(progressWidth, {
      toValue: 0,
      duration: 4500,
      useNativeDriver: false,
    }).start();

    // Auto-dismiss
    const timer = setTimeout(() => dismiss(), 4500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -110,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss(notification.id));
  }

  // Iniciales del remitente como avatar
  const initials = notification.senderName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Animated.View
      style={[styles.card, { transform: [{ translateY }], opacity }]}>
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => {
          dismiss();
          onPress?.(notification);
        }}
        style={styles.cardBody}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
          <View style={styles.avatarBadge} />
        </View>

        {/* Contenido */}
        <View style={styles.textContent}>
          <View style={styles.topRow}>
            <Text style={styles.senderName} numberOfLines={1}>
              {notification.senderName}
            </Text>
            {notification.time ? (
              <Text style={styles.timeText}>{notification.time}</Text>
            ) : null}
          </View>
          <Text style={styles.messageText} numberOfLines={2}>
            {notification.message}
          </Text>
        </View>

        {/* Punto de nuevo mensaje */}
        <View style={styles.newDot} />
      </TouchableOpacity>

      {/* Barra de progreso */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

// ─── Contenedor principal ────────────────────────────────────────────────────

interface ChatNotificationContainerProps {
  notifications: ChatNotificationData[];
  onDismiss: (id: string) => void;
  onPress?: (notification: ChatNotificationData) => void;
}

export function ChatNotificationContainer({
  notifications,
  onDismiss,
  onPress,
}: ChatNotificationContainerProps) {
  const insets = useSafeAreaInsets();

  if (notifications.length === 0) return null;

  return (
    <View
      style={[styles.container, { top: insets.top + scale(8) }]}
      pointerEvents="box-none">
      {notifications.map((n) => (
        <ChatNotificationItem
          key={n.id}
          notification={n}
          onDismiss={onDismiss}
          onPress={onPress}
        />
      ))}
    </View>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  card: {
    width: "91%",
    maxWidth: 420,
    backgroundColor: "#1A1A2E",
    borderRadius: scale(16),
    marginBottom: scale(8),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: scale(6) },
        shadowOpacity: 0.4,
        shadowRadius: scale(16),
      },
      android: {
        elevation: 14,
      },
    }),
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(14),
    paddingVertical: scale(11),
    gap: scale(11),
  },
  avatar: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: "#2D2D5E",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarText: {
    color: "#818CF8",
    fontSize: scale(15),
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  avatarBadge: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: scale(11),
    height: scale(11),
    borderRadius: scale(6),
    backgroundColor: "#34D399",
    borderWidth: 2,
    borderColor: "#1A1A2E",
  },
  textContent: {
    flex: 1,
    gap: scale(3),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  senderName: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontWeight: "700",
    flex: 1,
    marginRight: scale(6),
  },
  timeText: {
    color: "rgba(255,255,255,0.38)",
    fontSize: scale(11),
    fontWeight: "500",
  },
  messageText: {
    color: "rgba(255,255,255,0.62)",
    fontSize: scale(12),
    lineHeight: scale(17),
  },
  newDot: {
    width: scale(9),
    height: scale(9),
    borderRadius: scale(5),
    backgroundColor: "#818CF8",
  },
  progressTrack: {
    height: scale(3),
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  progressFill: {
    height: scale(3),
    backgroundColor: "#818CF8",
  },
});
