import { View, Text, StyleSheet, Pressable } from "react-native";
import { scale } from "react-native-size-matters";
import IconSymbol from "./IconSymbol";

type Props = {
  onGoToChat: () => void;
  onOpenProfile: () => void;
};

export function ContactActions({ onGoToChat, onOpenProfile }: Props) {
  return (
    <View style={styles.actions}>
      <Pressable
        style={({ pressed }) => [styles.button, styles.chatButton, pressed && { opacity: 0.7 }]}
        onPress={onGoToChat}>
        <IconSymbol name="chat" size={16} color="#ffb13d" />
        <Text style={styles.chatText}>Ir al chat</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.button, styles.profileButton, pressed && { opacity: 0.7 }]}
        onPress={onOpenProfile}>
        <IconSymbol name="clipboard" size={16} color="#151718" />
        <Text style={styles.profileText}>Ver solicitud</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "white",
    borderColor: "#ffb13d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  chatText: {
    color: "#ffb13d",
    fontSize: scale(13),
    fontWeight: "600",
  },
  profileButton: {
    backgroundColor: "#ffb13d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  profileText: {
    color: "#151718",
    fontSize: scale(13),
    fontWeight: "600",
  },
});