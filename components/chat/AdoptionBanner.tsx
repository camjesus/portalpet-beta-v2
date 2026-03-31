import { Pressable, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";

type Props = {
  isMine: boolean;
  isNotMine: boolean;
  hasPendingRequest: boolean;
  isPending: boolean;
  onOpenRequest: () => void;
  onSendRequest: () => void;
  onViewMyRequest: () => void;
};

export function AdoptionBanner({ isMine, isNotMine, hasPendingRequest, isPending, onOpenRequest, onSendRequest, onViewMyRequest }: Props) {
  if (isMine && hasPendingRequest) {
    return (
      <Pressable
        style={({ pressed }) => [styles.banner, pressed && styles.bannerPressed]}
        onPress={onOpenRequest}>
        <IconSymbol size={22} name="clipboard-clock-outline" color="#ffb13d" />
        <Text style={styles.text}>Revisar la solicitud de adopción</Text>
        <IconSymbol name="arrow-next" size={18} color="#A5A5A5" />
      </Pressable>
    );
  }

  if (isNotMine) {
    return (
      <Pressable
        style={({ pressed }) => [styles.banner, pressed && styles.bannerPressed]}
        onPress={isPending ? onViewMyRequest : onSendRequest}>
        <IconSymbol size={22} name="clipboard-arrow-up-outline" color="#ffb13d" />
        <Text style={styles.text}>
          {isPending ? "Ver tu solicitud enviada" : "Enviar solicitud de adopción"}
        </Text>
        <IconSymbol name="arrow-next" size={18} color="#A5A5A5" />
      </Pressable>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(12),
    marginTop: scale(8),
    marginBottom: scale(4),
    padding: scale(12),
    borderRadius: 12,
    gap: scale(10),
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  bannerPressed: {
    backgroundColor: "#2A2A2A",
  },
  text: {
    flex: 1,
    color: "white",
    fontSize: scale(13),
    fontWeight: "500",
  },
});
