import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui";
import { scale } from "react-native-size-matters";

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <IconSymbol name={icon} size={18} color="#A5A5A5" />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || "—"}</Text>
      </View>
    </View>
  );
}

interface InfoCardProps {
  name: string;
  lastname: string;
  email: string;
}

export function InfoCard({ name, lastname, email }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <InfoRow icon="account" label="Nombre" value={name} />
      <View style={styles.divider} />
      <InfoRow icon="account" label="Apellido" value={lastname} />
      <View style={styles.divider} />
      <InfoRow icon="email" label="Email" value={email} />
    </View>
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
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
  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginHorizontal: scale(16),
  },
});
