import { StyleSheet, Text, Pressable, View } from "react-native";

type Props = {
  changeOption: (opt: number) => void;
  option: number;
  labels?: string[];
  children?: React.ReactNode[];
};

export default function PanelButtons({
  changeOption,
  option,
  labels,
  children,
}: Props) {
  console.log("panel" + option);
  return (
    <View style={[styles.containerButton]}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "blue" : "red",
          },
          styles.button,
          styles.button_LEFT,
          option === 0 ? styles.active : styles.desactive,
          children && styles.static
        ]}
        onPress={() => changeOption(0)}
      >
        {labels && <Text style={styles.label}>{labels[0]}</Text>}
        {children && children[0]}
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "blue" : "red",
          },
          styles.button,
          styles.button_CENTER,
          option === 1 ? styles.active : styles.desactive,
          children && styles.static

        ]}
        onPress={() => changeOption(1)}
      >
        {labels && <Text style={styles.label}>{labels[1]}</Text>}
        {children && children[1]}
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "blue" : "red",
          },
          styles.button,
          styles.button_RIGTH,
          option == 2 ? styles.active : styles.desactive,
          children && styles.static

        ]}
        onPress={() => changeOption(2)}
      >
        {labels && <Text style={styles.label}>{labels[2]}</Text>}
        {children && children[2]}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 3,
    borderColor: "#ffd33d",
    padding: 10,
  },
  active: {
    backgroundColor: "white",
  },
  desactive: {
    backgroundColor: "#ffb13d",
  },
  button_LEFT: {
    borderBottomLeftRadius: 5,
    borderStartStartRadius: 5,
  },
  button_CENTER: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  button_RIGTH: {
    borderBottomRightRadius: 5,
    borderEndStartRadius: 5,
  },
  label: {
    marginHorizontal: 5,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  static: {
    height: 52,
    width: 52,
    justifyContent: "center",
    alignItems: "center",
  }
});
