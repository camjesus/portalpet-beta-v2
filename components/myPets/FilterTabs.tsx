import { StyleSheet, Text, Pressable, View } from "react-native";
import { scale } from "react-native-size-matters";

export type FilterType = "active" | "inactive";

type Props = {
  selected: FilterType;
  onSelect: (key: FilterType) => void;
};

export function FilterTabs({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.boxLeft}>
        <Pressable
          style={[styles.buttonLeft, selected === "active" ? styles.active : styles.inactive]}
          onPress={() => onSelect("active")}>
          <Text style={[styles.label, selected === "active" && styles.activeLabel]}>
            Activas
          </Text>
        </Pressable>
      </View>
      <View style={styles.boxRight}>
        <Pressable
          style={[styles.buttonRight, selected === "inactive" ? styles.active : styles.inactive]}
          onPress={() => onSelect("inactive")}>
          <Text style={[styles.label, selected === "inactive" && styles.activeLabel]}>
            Finalizadas
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "transparent",
    marginTop: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 boxLeft: {
  flex: 1,
  borderColor: "#ffb13d",
  borderWidth: 2,
  borderTopLeftRadius: 40,
  borderBottomLeftRadius: 40,
},
boxRight: {
  flex: 1,
  borderColor: "#ffb13d",
  borderWidth: 2,
  borderTopRightRadius: 40,
  borderBottomRightRadius: 40,
},
buttonLeft: {
  flex: 1,
  paddingVertical: scale(8),
  paddingHorizontal: scale(10),
  borderTopLeftRadius: 40,
  borderBottomLeftRadius: 40,
  alignItems: "center",
},
buttonRight: {
  flex: 1,
  paddingVertical: scale(8),
  paddingHorizontal: scale(10),
  borderTopRightRadius: 40,
  borderBottomRightRadius: 40,
  alignItems: "center",
},
  active: {
    backgroundColor: "#ffb13d",
  },
  inactive: {
    backgroundColor: "white",
  },
  label: {
    marginHorizontal: scale(5),
    textAlign: "center",
    color: "#A5A5A5",
    fontWeight: "bold",
  },
  activeLabel: {
    color: "#4B4B4B",
  },
});