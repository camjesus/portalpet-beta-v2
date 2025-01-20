import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  label?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  circle?: boolean;
};

export default function Button({ label, onPress, children, circle }: Props) {
  return (
    <View style={styles.containerButton}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#DCAD5F" : "#ffb13d",
          },
          styles.button,
          circle ? styles.circleStyle : styles.default,
        ]}
        onPress={onPress}
      >
        {children}
        {label && <Text style={styles.label}>{label}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    alignItems: "center",
    marginTop: scale(16),
  },
  button: {
    borderWidth: 3,
    borderColor: "white",
    flexDirection: "row",
    padding: scale(10),
    bottom: 0,
    position: "relative",
  },
  default: {
    borderRadius: 10,
  },
  circleStyle: {
    borderRadius: 50,
  },
  label: {
    marginHorizontal: 5,
    textAlign: "center",
    color: "#4B4B4B",
    fontWeight: "bold",
  },
});
