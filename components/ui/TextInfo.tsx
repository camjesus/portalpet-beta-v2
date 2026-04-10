import { Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  text: string;
};

export function TextInfo({ text }: Props) {
  return <Text style={styles.infoText}>{text}</Text>;
}

const styles = StyleSheet.create({
  infoText: {
    color: "black",
    fontSize: scale(12),
    marginHorizontal: scale(10),
    marginVertical: scale(10),
    padding: scale(10),
    borderRadius: 10,
    borderColor: "#fbc737ff",
    borderWidth: 2,
    textAlign: "center",
    backgroundColor: "#fff7e6ff",
  },
});