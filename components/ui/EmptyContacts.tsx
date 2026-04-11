import { View, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import IconSymbol from "./IconSymbol";

type Props = {
  title?: string;
  description?: string;
};

export function EmptyContacts({
  title = "Sin contactos aún",
  description = "Cuando alguien se contacte por esta mascota aparecerá aquí.",
}: Props) {
  return (
    <View style={styles.container}>
      <IconSymbol name="chat" size={48} color="#A5A5A5" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10),
    paddingHorizontal: scale(30),
  },
  title: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#151718",
    textAlign: "center",
  },
  description: {
    fontSize: scale(13),
    color: "#A5A5A5",
    textAlign: "center",
    lineHeight: scale(20),
  },
});