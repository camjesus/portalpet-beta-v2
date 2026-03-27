import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";

export function AdoptionProfileCard() {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push("/adoptionProfile")}>
      <IconSymbol name="paw" size={24} color="#ffb13d" />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Mi perfil adoptante</Text>
        <Text style={styles.subtitle}>
          Completá tu perfil para solicitar adopciones
        </Text>
      </View>
      <IconSymbol name="arrow-next" size={20} color="#A5A5A5" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(20),
    padding: scale(16),
    borderRadius: 12,
    gap: scale(12),
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  cardPressed: {
    backgroundColor: "#2A2A2A",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(14),
  },
  subtitle: {
    color: "#A5A5A5",
    fontSize: scale(11),
    marginTop: scale(2),
  },
});
