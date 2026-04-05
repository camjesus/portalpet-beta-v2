import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui";
import { scale } from "react-native-size-matters";

export function EmptyState() {
  return (
    <View style={styles.container}>
      <IconSymbol name="chat" size={60} color="#A5A5A5" />
      <Text style={styles.title}>Sin mensajes</Text>
      <Text style={styles.text}>
        Tus conversaciones aparecerán acá
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: scale(60),
    gap: scale(12),
    paddingHorizontal: scale(30),
  },
  title: {
    color: "white",
    fontSize: scale(20),
    fontWeight: "bold",
  },
  text: {
    color: "#A5A5A5",
    fontSize: scale(16),
    textAlign: "center",
    lineHeight: scale(20),
  },
});
