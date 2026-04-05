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
          <Text style={styles.label}>Sobre mí ({value.length}/{BIO_MAX})</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(v) => onChange(v.slice(0, BIO_MAX))}
            placeholder="Presentate ante la comunidad"
            placeholderTextColor="#A5A5A5"
            multiline
            autoFocus
            maxLength={BIO_MAX}
            scrollEnabled
            textAlignVertical="top"
          />

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
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    padding: scale(20),
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffffffff",
  },
  label: {
    color: "#151718",
    fontWeight: "bold",
    fontSize: scale(13),
    marginBottom: scale(5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    fontSize: scale(14),
    color: "#151718",
    minHeight: scale(80),
    maxHeight: scale(120),
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
