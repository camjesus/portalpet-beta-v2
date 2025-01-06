import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";

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
  },
  button: {
    borderWidth: 3,
    borderColor: "#ffd33d",
    flexDirection: "row",
    padding: 10,
  },
  default: {
    borderRadius: 15,
  },
  circleStyle: {
    borderRadius: 50,
  },
  label: {
    marginHorizontal: 5,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
});
