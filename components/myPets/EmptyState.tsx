import { StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

export function EmptyState() {
  return <Text style={styles.message}>Subite unas mascoteiras!</Text>;
}

const styles = StyleSheet.create({
  message: {
    marginTop: scale(400),
    textAlign: "center",
    color: "white",
    fontSize: scale(26),
  },
});
