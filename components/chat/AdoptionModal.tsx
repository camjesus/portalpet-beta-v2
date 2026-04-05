import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function AdoptionModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <IconSymbol name="paw" size={40} color="#ffb13d" />
          <Text style={styles.modalTitle}>¿Querés solicitar la adopción?</Text>
          <Text style={styles.modalSubtitle}>
            Se enviará tu perfil adoptante al rescatista
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalButtonNo} onPress={onCancel}>
              <Text style={styles.modalButtonNoText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.modalButtonYes} onPress={onConfirm}>
              <Text style={styles.modalButtonYesText}>Sí, solicitar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: scale(24),
    marginHorizontal: scale(30),
    alignItems: "center",
    gap: scale(12),
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  modalTitle: {
    color: "#151718",
    fontWeight: "bold",
    fontSize: scale(16),
    textAlign: "center",
  },
  modalSubtitle: {
    color: "#7f7e7eff",
    fontSize: scale(12),
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: scale(8),
  },
  modalButtonNo: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7f7e7eff",
  },
  modalButtonNoText: {
    color: "#7f7e7eff",
    fontWeight: "bold",
    fontSize: scale(13),
  },
  modalButtonYes: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: 20,
    backgroundColor: "#ffb13d",
  },
  modalButtonYesText: {
    color: "#151718",
    fontWeight: "bold",
    fontSize: scale(13),
  },
});
