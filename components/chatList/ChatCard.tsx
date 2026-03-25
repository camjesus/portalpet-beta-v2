import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { loadAction } from "@/services/utils/usePet";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";
import { ChatId } from "@/models";
import IconSymbol from "../ui/IconSymbol";
import { formatURL } from "@/services/utils/useUtil";
import { markChatAsRead } from "@/features/chat/repository/chatRepository";

type Props = {
  item: ChatId;
  userId: string | undefined | null;
};

export default function Card({ item, userId }: Props) {
  const [data, setData] = useState({ action: "", color: "" });
  const image = item?.chat?.pet?.image ?? "";
  const contactName =
    userId === item?.chat.rescuer?.id
      ? item?.chat.user?.name
      : item?.chat.rescuer?.name;
  const hasUnread =
    userId === item?.chat.rescuer?.id
      ? item?.chat.hasUnreadRescuer
      : item?.chat.hasUnreadUser;
  const adoptionConfig = {
    pending: { label: "Solicitud pendiente", color: "#DCAD5F" },
    accepted: { label: "Adopción aceptada", color: "#4CAF50" },
    rejected: { label: "Solicitud rechazada", color: "#E57373" },
    none: null,
  };
  const adoption = adoptionConfig[item?.chat.adoptionStatus ?? "none"];

  useEffect(() => {
    const result = loadAction(item?.chat.pet?.action ?? "");
    if (Array.isArray(result)) {
      setData({ action: result[0], color: result[1] });
    }
  }, []);

  useEffect(() => {
    if (!item?.id || !item?.id) return;
    const isRescuer = userId === item.chat.rescuer.id;
    markChatAsRead(item.id, isRescuer);
  }, [item?.id, item?.id]);

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/chat", params: { chatId: item.id } })
      }>
      <View style={[styles.card, { borderLeftColor: data.color }]}>
        <Image source={{ uri: formatURL(image) }} style={styles.image} />
        <View style={styles.viewDesc}>
          <View style={styles.viewRow}>
            <IconSymbol name="paw" size={20} color="#ffb13d" />
            <Text style={styles.textName}>{item?.chat.pet?.name}</Text>
          </View>
          <View style={styles.viewRow}>
            <IconSymbol name="account" size={20} color="#A5A5A5" />
            <Text style={styles.textMeta}>{contactName}</Text>
          </View>
        </View>
        <View style={styles.viewAction}>
          <Text style={[styles.badge, { backgroundColor: data.color }]}>
            {data.action}
          </Text>
        </View>
        {adoption && (
          <View
            style={[styles.adoptionBadge, { backgroundColor: adoption.color }]}>
            <Text style={styles.adoptionBadgeText}>{adoption.label}</Text>
          </View>
        )}
        {hasUnread && <View style={styles.unreadDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  adoptionBadge: {
    position: "absolute",
    right: scale(10),
    top: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: 10,
  },
  adoptionBadgeText: {
    color: "white",
    fontSize: scale(9),
    fontWeight: "bold",
  },
  unreadDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: "#f95748",
    position: "absolute",
    top: scale(10),
    right: scale(10),
  },
  card: {
    borderRadius: 16,
    width: "100%",
    height: scale(90),
    marginBottom: scale(10),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0E6D3",
    borderLeftWidth: scale(4),
  },
  image: {
    width: scale(90),
    height: scale(90),
    resizeMode: "cover",
  },
  viewDesc: {
    flex: 1,
    paddingHorizontal: scale(12),
    justifyContent: "center",
    gap: scale(8),
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  textName: {
    color: "#151718",
    fontSize: scale(14),
    fontWeight: "bold",
  },
  textMeta: {
    color: "#A5A5A5",
    fontSize: scale(12),
  },
  viewAction: {
    position: "absolute",
    right: scale(10),
    bottom: scale(8),
  },
  badge: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: scale(10),
  },
});
