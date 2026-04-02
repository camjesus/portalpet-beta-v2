import { View, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  label: string;
  value: string;
};

export function DetailRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  label: {
    color: "#A5A5A5",
    fontSize: scale(13),
    flex: 1,
  },
  value: {
    color: "white",
    fontSize: scale(13),
    fontWeight: "600",
  },
});
