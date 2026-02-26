import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  label?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  circle?: boolean;
  disabled?: boolean | true;
};

export default function Button({
  label,
  onPress,
  children,
  circle,
  disabled,
}: Props) {
  return (
    <View style={styles.containerButton}>
      <Pressable
        disabled={disabled}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#DCAD5F" : "#ffb13d",
          },
          styles.button,
          circle ? styles.circleStyle : styles.default,
        ]}
        onPress={onPress}>
        {children}
        {label && <Text style={styles.label}>{label}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    alignItems: "center",
  },
  button: {
    borderWidth: 3,
    borderColor: "white",
    flexDirection: "row",
    padding: scale(10),
    bottom: 0,
    position: "relative",
    alignItems: "center",
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
