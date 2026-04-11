import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "../ui";

type SortType = "recent" | "nearby";

type Props = {
  visible: boolean;
  selected: SortType;
  onSelect: (sort: SortType) => void;
  onClose: () => void;
};

const OPTIONS: { key: SortType; label: string; icon: string }[] = [
  { key: "recent", label: "Más recientes", icon: "schedule" },
  { key: "nearby", label: "Más cercanos", icon: "location-on" },
];

export function SortModal({ visible, selected, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.card}>
          <Text style={styles.title}>Ordenar por</Text>
          {OPTIONS.map((opt) => (
            <Pressable
              key={opt.key}
              style={[styles.option, selected === opt.key && styles.optionActive]}
              onPress={() => { onSelect(opt.key); onClose(); }}>
              <Text style={[styles.label, selected === opt.key && styles.labelActive]}>
                {opt.label}
              </Text>
              {selected === opt.key && (
                <IconSymbol name="check" size={18} color="#ffb13d" />
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: scale(90),
    paddingRight: scale(20),
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: scale(12),
    minWidth: scale(180),
    gap: scale(4),
  },
  title: {
    fontSize: scale(12),
    color: "#ffb13d",
    paddingHorizontal: scale(8),
    paddingBottom: scale(4),
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(10),
    paddingHorizontal: scale(8),
    borderRadius: 8,
  },
  optionActive: {
    backgroundColor: "rgba(255,177,61,0.1)",
  },
  label: {
    fontSize: scale(14),
    color: "#151718",
  },
  labelActive: {
    fontWeight: "600",
    color: "#ffb13d",
  },
});