import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  label?: string;
  active: boolean;
  onPress: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

export default function CheckBox({ label, active, onPress, children }: Props) {
  return (
    <View style={styles.containerRow}>
      <View
        style={{
          borderColor: "#ffb13d",
          borderWidth: 3,
          borderRadius: 50,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#DCAD5F" : "white",
            },
            styles.box,
            active && styles.active,
          ]}
          onPress={() => onPress(!active)}
        >
          {children}
        </Pressable>
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    borderWidth: scale(3),
    borderColor: "white",
    padding: scale(8),
    borderRadius: 30,
  },
  active: {
    backgroundColor: "#ffb13d",
  },
  label: {
    marginStart: scale(10),
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
