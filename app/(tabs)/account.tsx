import { Pressable, StyleSheet, Text, View } from "react-native";
import { ViewCustom, HeaderCustom, IconSymbol } from "@/components/ui";
import { useEffect, useState } from "react";
import { User } from "@/models";
import { getUserAsync, saveUserAsync } from "@/services/storage/userStorage";
import { scale } from "react-native-size-matters";
import { cleanAllAsync } from "@/services/storage/userStorage";
import { router } from "expo-router";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await getUserAsync();
    if (!storedUser) return;
    setUser(storedUser);
    setName(storedUser.name ?? "");
    setLastname(storedUser.lastname ?? "");
    setEmail(storedUser.email ?? "");
  };

  const clearAll = async () => {
    await cleanAllAsync();
    router.replace("/signin");
  };

  return (
    <ViewCustom>
      <HeaderCustom title="Mis datos" />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <IconSymbol name="account" size={18} color="#A5A5A5" />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Nombre</Text>
                <Text style={styles.infoValue}>{name || "—"}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <IconSymbol name="account" size={18} color="#A5A5A5" />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Apellido</Text>
                <Text style={styles.infoValue}>{lastname || "—"}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <IconSymbol name="email" size={18} color="#A5A5A5" />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{email || "—"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.submit}>
            <Pressable
              style={({ pressed }) => [
                styles.adoptionCard,
                pressed && styles.adoptionCardPressed,
              ]}
              onPress={() => router.push("/adoptionProfile")}>
              <IconSymbol name="paw" size={24} color="#ffb13d" />
              <View style={{ flex: 1 }}>
                <Text style={styles.adoptionCardTitle}>
                  Mi perfil adoptante
                </Text>
                <Text style={styles.adoptionCardSubtitle}>
                  Completá tu perfil para solicitar adopciones
                </Text>
              </View>
              <IconSymbol name="arrow-next" size={20} color="#A5A5A5" />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutCard,
            pressed && styles.logoutCardPressed,
          ]}
          onPress={clearAll}>
          <IconSymbol name="logout" size={22} color="#E57373" />
          <Text style={styles.logoutCardText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: scale(30),
  },
  container: {
    marginTop: scale(30),
    gap: scale(20),
  },
  infoCard: {
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
  infoLabel: {
    color: "#A5A5A5",
    fontSize: scale(11),
    marginBottom: scale(2),
  },
  infoValue: {
    color: "white",
    fontSize: scale(14),
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginHorizontal: scale(16),
  },
  submit: {
    gap: scale(10),
  },
  adoptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(20),
    padding: scale(16),
    borderRadius: 12,
    gap: scale(12),
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  adoptionCardPressed: {
    backgroundColor: "#2A2A2A",
  },
  adoptionCardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(14),
  },
  adoptionCardSubtitle: {
    color: "#A5A5A5",
    fontSize: scale(11),
    marginTop: scale(2),
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(20),
    padding: scale(16),
    borderRadius: 12,
    gap: scale(12),
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  actionCardPressed: {
    backgroundColor: "#2A2A2A",
  },
  actionCardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(14),
    flex: 1,
  },
  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(20),
    padding: scale(16),
    borderRadius: 12,
    gap: scale(12),
    borderWidth: 1,
    borderColor: "#E57373",
  },
  logoutCardPressed: {
    backgroundColor: "#2A2A2A",
  },
  logoutCardText: {
    color: "#E57373",
    fontWeight: "bold",
    fontSize: scale(14),
  },
});
