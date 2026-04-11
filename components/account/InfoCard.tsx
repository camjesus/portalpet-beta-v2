import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { IconSymbol } from "@/components/ui";
import { scale } from "react-native-size-matters";
import { BioEditModal } from "./BioEditModal";

interface InfoCardProps {
  email: string;
  bio: string;
  onSaveBio: (value: string) => void;
}

export function InfoCard({ email, bio, onSaveBio }: InfoCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState(bio);

  const handleOpen = () => {
    setDraft(bio);
    setModalVisible(true);
  };

  const handleSave = () => {
    onSaveBio(draft);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.row}>
          <IconSymbol name="email" size={18} color="#ffb13d" />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email || "—"}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <IconSymbol name="text-account" size={18} color="#ffb13d" />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Sobre mí</Text>
            <Text style={[styles.value, !bio && styles.empty]}>
              {bio || "Sin descripción"}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.editButton, pressed && { opacity: 0.6 }]}
            onPress={handleOpen}>
            <IconSymbol name="edit" size={16} color="#ffb13d" />
          </Pressable>
        </View>
      </View>

      <BioEditModal
        visible={modalVisible}
        value={draft}
        onChange={setDraft}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffff",
    marginHorizontal: scale(20),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c4cfd5ff",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: scale(16),
    gap: scale(12),
  },
  label: {
    color: "#151718",
    fontSize: scale(11),
    marginBottom: scale(2),
  },
  value: {
    color: "#151718",
    fontSize: scale(14),
  },
  empty: {
    color: "#151718",
    fontWeight: "normal",
    fontStyle: "italic",
  },
  editButton: {
    padding: scale(4),
    marginTop: scale(2),
  },
  divider: {
    height: 1,
    backgroundColor: "#c4cfd5ff",
    marginHorizontal: scale(16),
  },
});
