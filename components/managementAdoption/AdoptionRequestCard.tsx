import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { ContactActions, IconSymbol } from "@/components/ui";
import { AdoptionProfile, AdoptionRequestId } from "@/models";
import { formatDate } from "../petProfile/petProfileUtils";

type Props = {
  request: AdoptionRequestId;
  profile: AdoptionProfile | null;
  pinned: boolean;
  onGoToChat: () => void;
  onOpenProfile: () => void;
  onTogglePin: () => void;
};

export function AdoptionRequestCard({ request, pinned, onGoToChat, onOpenProfile, onTogglePin }: Props) {
  const displayName = request.userName + " " + request.userLastName;
  const date = formatDate(request.createdAt);

  return (
    <View style={[styles.card, pinned && styles.cardPinned]}>
      <View style={styles.header}>
        {request.userImage ? (
          <Image source={{ uri: request.userImage }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <IconSymbol name="account" size={24} color="#ffb13d" />
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.date}>
            <Text style={styles.dateLabel}>Solicitud: </Text>
            {date}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.pinButton, pressed && { opacity: 0.6 }]}
          onPress={onTogglePin}>
          <IconSymbol
            name={pinned ? "pin" : "pin-off"}
            size={18}
            color={pinned ? "#ffb13d" : "#A5A5A5"}
          />
        </Pressable>
      </View>

      <ContactActions onGoToChat={onGoToChat} onOpenProfile={onOpenProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: scale(16),
    gap: scale(14),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardPinned: {
    borderColor: "#ffb13d",
    borderWidth: 1.5,
  },
  pinButton: {
    padding: scale(4),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: 2,
    borderColor: "#ffb13d",
  },
  avatarFallback: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: "rgba(255,177,61,0.15)",
    borderWidth: 2,
    borderColor: "#ffb13d",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: scale(2),
  },
  name: {
    color: "#151718",
    fontSize: scale(15),
    fontWeight: "bold",
  },
  date: {
    color: "#151718",
    fontSize: scale(11),

  },
  dateLabel: {
    color: "#737272ff",
    fontWeight: "normal",
  },
  actions: {
    flexDirection: "row",
    gap: scale(10),
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
    paddingVertical: scale(10),
    borderRadius: 10,
  },
  chatButton: {
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  chatText: {
    color: "#ffb13d",
    fontSize: scale(13),
    fontWeight: "600",
  },
  profileButton: {
    backgroundColor: "#ffb13d",
  },
  profileText: {
    color: "#151718",
    fontSize: scale(13),
    fontWeight: "600",
  },
});
