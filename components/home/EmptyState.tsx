import { StyleSheet, Text, View } from "react-native";
import { IconSymbol, Button } from "@/components/ui";
import { scale } from "react-native-size-matters";

interface EmptyStateProps {
  onPress: () => void;
}

export function EmptyState({ onPress }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <IconSymbol name="paw" size={60} color="#A5A5A5" />
      <Text style={styles.title}>Sin resultados</Text>
      <Text style={styles.text}>
        No encontramos mascotas con los filtros seleccionados
      </Text>
      <Button label="Modificar filtros" onPress={onPress} />
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
    fontSize: scale(13),
    textAlign: "center",
    lineHeight: scale(20),
  },
});
