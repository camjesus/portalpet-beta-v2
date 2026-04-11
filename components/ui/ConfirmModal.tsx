import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
};

export function ConfirmModal({
  visible,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  danger = false,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttons}>
            <Pressable style={styles.btnCancel} onPress={onCancel}>
              <Text style={styles.btnCancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable
              style={[styles.btnConfirm, danger && styles.btnDanger]}
              onPress={onConfirm}>
              <Text style={styles.btnConfirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: scale(24),
    gap: scale(12),
    width: "100%",
  },
  title: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#151718",
    textAlign: "center",
  },
  description: {
    fontSize: scale(14),
    color: "#666",
    textAlign: "center",
    lineHeight: scale(20),
  },
  buttons: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: scale(4),
  },
  btnCancel: {
    flex: 1,
    borderRadius: 12,
    padding: scale(14),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A5A5A5",
  },
  btnCancelText: {
    color: "#666",
    fontWeight: "600",
    fontSize: scale(14),
  },
  btnConfirm: {
    flex: 1,
    borderRadius: 12,
    padding: scale(14),
    alignItems: "center",
    backgroundColor: "#ffb13d",
  },
  btnDanger: {
    backgroundColor: "#c0392b",
  },
  btnConfirmText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(14),
  },
});