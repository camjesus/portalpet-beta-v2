import { StyleSheet, Text, TextInput, View, Modal, Pressable } from "react-native";
import { scale } from "react-native-size-matters";

const BIO_MAX = 200;

type Props = {
  visible: boolean;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
};

export function BioEditModal({ visible, value, onChange, onSave, onClose }: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Sobre mí</Text>

          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(v) => onChange(v.slice(0, BIO_MAX))}
            placeholder="Presentate ante la comunidad"
            placeholderTextColor="#555"
            multiline
            autoFocus
            maxLength={BIO_MAX}
          />
          <Text style={styles.counter}>{value.length}/{BIO_MAX}</Text>

          <View style={styles.buttons}>
            <Pressable
              style={({ pressed }) => [styles.cancelButton, pressed && { opacity: 0.7 }]}
              onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.7 }]}
              onPress={onSave}>
              <Text style={styles.saveText}>Guardar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(24),
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: scale(20),
    width: "100%",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  title: {
    color: "#ffb13d",
    fontSize: scale(14),
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: scale(14),
  },
  input: {
    backgroundColor: "#151718",
    borderRadius: 10,
    padding: scale(12),
    color: "white",
    fontSize: scale(14),
    lineHeight: scale(20),
    minHeight: scale(100),
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  counter: {
    color: "#555",
    fontSize: scale(10),
    textAlign: "right",
    marginTop: scale(6),
  },
  buttons: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: scale(16),
  },
  cancelButton: {
    flex: 1,
    padding: scale(13),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#555",
    alignItems: "center",
  },
  cancelText: {
    color: "#A5A5A5",
    fontWeight: "bold",
    fontSize: scale(14),
  },
  saveButton: {
    flex: 1,
    padding: scale(13),
    borderRadius: 10,
    backgroundColor: "#ffb13d",
    alignItems: "center",
  },
  saveText: {
    color: "#151718",
    fontWeight: "bold",
    fontSize: scale(14),
  },
});
