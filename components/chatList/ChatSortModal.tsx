import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";


export type ChatSortType = "recent" | "pending" | "action";

const OPTIONS: { key: ChatSortType; label: string; icon: string }[] = [
  { key: "recent", label: "Más recientes", icon: "clock" },
  { key: "pending", label: "Solicitudes pendientes", icon: "clipboard" },
  { key: "action", label: "Por estado", icon: "paw" },
];

type Props = {
  visible: boolean;
  selected: ChatSortType;
  onSelect: (sort: ChatSortType) => void;
  onClose: () => void;
};

export function ChatSortModal({ visible, selected, onSelect, onClose }: Props) {
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
              <IconSymbol name={opt.icon as any} size={18} color={selected === opt.key ? "#ffb13d" : "#A5A5A5"} />
              <Text style={[styles.label, selected === opt.key && styles.labelActive]}>
                {opt.label}
              </Text>
              {selected === opt.key && (
                <IconSymbol name="check" size={16} color="#ffb13d" />
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
    alignItems: "flex-start",
    paddingTop: scale(90),
    paddingLeft: scale(20),
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: scale(12),
    minWidth: scale(230),
    gap: scale(4),
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: scale(12),
    color: "#151718",
    paddingHorizontal: scale(8),
    paddingBottom: scale(4),
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    paddingVertical: scale(10),
    paddingHorizontal: scale(8),
    borderRadius: 8,
  },
  optionActive: {
    backgroundColor: "rgba(255,177,61,0.1)",
  },
  label: {
    flex: 1,
    fontSize: scale(13),
    color: "#151718",
  },
  labelActive: {
    fontWeight: "600",
    color: "#ffb13d",
  },
});