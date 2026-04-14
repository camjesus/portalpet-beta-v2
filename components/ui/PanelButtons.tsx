import { StyleSheet, Text, Pressable, View } from "react-native";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";
import { scale } from "react-native-size-matters";

type Props = {
  changeOption: (opt: number) => void;
  option: number;
  labels?: string[];
  children?: React.ReactNode[];
  shadow?: boolean;
};

export default function PanelButtons({
  changeOption,
  option,
  labels,
  children,
  shadow = true,
}: Props) {
  return (
    <View style={[styles.containerButton, shadow && styles.shadow]}>
      <View style={styles.boxLeft}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#DCAD5F" : "white",
            },
            styles.buttonLeft,
            option === 0 ? styles.active : styles.desactive,
            children && styles.static,
          ]}
          onPress={() => changeOption(0)}>
          {labels && (
            <Text style={[styles.label, , option == 0 && styles.activeLabel]}>
              {labels[0]}
            </Text>
          )}
          {children && children[0]}
        </Pressable>
      </View>
      <View style={styles.boxCenter}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#DCAD5F" : "white",
            },
            styles.button,
            option === 1 ? styles.active : styles.desactive,
            children && styles.static,
          ]}
          onPress={() => changeOption(1)}>
          {labels && (
            <Text style={[styles.label, , option == 1 && styles.activeLabel]}>
              {labels[1]}
            </Text>
          )}
          {children && children[1]}
        </Pressable>
      </View>
      <View style={styles.boxRight}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#DCAD5F" : "white",
            },
            styles.buttonRight,
            option == 2 ? styles.active : styles.desactive,
            children && styles.static,
          ]}
          onPress={() => changeOption(2)}>
          {labels && (
            <Text style={[styles.label, option == 2 && styles.activeLabel]}>
              {labels[2]}
            </Text>
          )}
          {children && children[2]}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffb13d",
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
  },
  buttonRight: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  buttonLeft: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  active: {
    backgroundColor: "#ffb13d",
  },
  desactive: {
    backgroundColor: "white",
  },
  label: {
    marginHorizontal: scale(5),
    textAlign: "center",
    color: "#A5A5A5",
    fontWeight: "bold",
  },
  static: {
    height: scale(45),
    width: scale(45),
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: {
    color: "#4B4B4B",
  },
  boxRight: {
    borderColor: "#ffb13d",
    borderWidth: 2,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  boxLeft: {
    borderColor: "#ffb13d",
    borderWidth: 2,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  boxCenter: {
    borderColor: "#ffb13d",
    borderWidth: 2,
  },
});
