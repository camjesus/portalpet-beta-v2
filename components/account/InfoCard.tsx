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
          <IconSymbol name="email" size={18} color="#A5A5A5" />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email || "—"}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <IconSymbol name="text-account" size={18} color="#A5A5A5" />
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
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(20),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: scale(16),
    gap: scale(12),
  },
  label: {
    color: "#A5A5A5",
    fontSize: scale(11),
    marginBottom: scale(2),
  },
  value: {
    color: "white",
    fontSize: scale(14),
    fontWeight: "bold",
  },
  empty: {
    color: "#555",
    fontWeight: "normal",
    fontStyle: "italic",
  },
  editButton: {
    padding: scale(4),
    marginTop: scale(2),
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginHorizontal: scale(16),
  },
});
