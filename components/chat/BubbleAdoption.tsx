import { View, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";

type Props = {
  isMyMessage: boolean;
  type: "adoption_request" | "adoption_accepted" | "adoption_rejected";
};

const config = {
  adoption_request: {
    title: "Solicitud de adopción",
    subtitle: (isMyMessage: boolean) =>
      isMyMessage ? "Enviaste una solicitud" : "Quiere adoptar tu mascota",
    badgeText: "Pendiente",
    badgeColor: "#DCAD5F",
    icon: "help",
    iconColor: "#DCAD5F",
  },
  adoption_accepted: {
    title: "Adopción aceptada",
    subtitle: (isMyMessage: boolean) =>
      isMyMessage ? "Aceptaste la solicitud" : "Tu solicitud fue aceptada 🎉",
    badgeText: "Aceptada",
    badgeColor: "#4CAF50",
    icon: "check",
    iconColor: "#4CAF50",
  },
  adoption_rejected: {
    title: "Adopción rechazada",
    subtitle: (isMyMessage: boolean) =>
      isMyMessage ? "Rechazaste la solicitud" : "Tu solicitud fue rechazada",
    badgeText: "Rechazada",
    badgeColor: "#E57373",
    icon: "close",
    iconColor: "#E57373",
  },
};

export default function BubbleAdoption({ isMyMessage, type }: Props) {
  const c = config[type];
  return (
    <View style={[styles.container, isMyMessage ? styles.right : styles.left]}>
      <IconSymbol name={c.icon} size={20} color={c.iconColor} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{c.title}</Text>
        <Text style={styles.subtitle}>{c.subtitle(isMyMessage)}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: c.badgeColor }]}>
        <Text style={styles.badgeText}>{c.badgeText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(12),
    borderRadius: 12,
    margin: scale(3),
    gap: scale(10),
    borderWidth: 1,
    borderColor: "#ffb13d",
    backgroundColor: "#1E1E1E",
  },
  left: {
    alignSelf: "flex-start",
    marginRight: scale(10),
  },
  right: {
    alignSelf: "flex-end",
    marginLeft: scale(10),
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(12),
  },
  subtitle: {
    color: "#A5A5A5",
    fontSize: scale(11),
    marginTop: scale(2),
  },
  badge: {
    backgroundColor: "#DCAD5F",
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: 10,
  },
  badgeText: {
    color: "#151718",
    fontSize: scale(10),
    fontWeight: "bold",
  },
});
