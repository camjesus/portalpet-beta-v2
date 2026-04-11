import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";
import { ChatId } from "@/models";
import IconSymbol from "./IconSymbol";

type Props = {
  item: ChatId;
  currentUserId: string;
};

export function ContactChatCard({ item, currentUserId }: Props) {
  const { chat } = item;
  const isRescuer = chat.rescuer.id === currentUserId;
  const contact = isRescuer ? chat.user : chat.rescuer;

  function goToChat() {
    router.push({ pathname: "/chat", params: { chatId: item.id } });
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
      onPress={goToChat}>
      <View style={styles.avatar}>
        {contact.image ? (
          <Image source={{ uri: contact.image }} style={styles.avatarImg} />
        ) : (
          <Text style={styles.avatarInitial}>
            {contact.name?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.sub} numberOfLines={1}>
          Tocá para ver la conversación
        </Text>
      </View>

      <IconSymbol name="chevron-right" size={20} color="#A5A5A5" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: scale(12),
    marginHorizontal: scale(16),
    marginBottom: scale(10),
    gap: scale(12),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    backgroundColor: "rgba(255,177,61,0.15)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffb13d",
  },
  avatarImg: {
    width: scale(46),
    height: scale(46),
  },
  avatarInitial: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#ffb13d",
  },
  info: {
    flex: 1,
    gap: scale(3),
  },
  name: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#151718",
  },
  sub: {
    fontSize: scale(12),
    color: "#A5A5A5",
  },
});