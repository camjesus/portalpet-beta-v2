import { Pressable, StyleSheet, Text } from "react-native";
import { IconSymbol } from "@/components/ui";
import { scale } from "react-native-size-matters";

interface LogoutCardProps {
  onPress: () => void;
}

export function LogoutCard({ onPress }: LogoutCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>
      <IconSymbol name="logout" size={22} color="#E57373" />
      <Text style={styles.text}>Cerrar sesión</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: scale(20),
    padding: scale(16),
    borderRadius: 12,
    gap: scale(12),
    borderWidth: 2,
    borderColor: "#E57373",
  },
  cardPressed: {
    backgroundColor: "#2A2A2A",
  },
  text: {
    color: "#E57373",
    fontWeight: "bold",
    fontSize: scale(14),
  },
});
