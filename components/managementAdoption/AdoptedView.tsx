import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { ContactActions, IconSymbol } from "@/components/ui";
import { AdoptionRequestId } from "@/models";
import { formatDate } from "@/components/petProfile/petProfileUtils";
import { logo } from "@/assets/images";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  request: AdoptionRequestId | undefined;
  onGoToChat: () => void;
  onOpenProfile: () => void;
};

export function AdoptedView({ request, onGoToChat, onOpenProfile }: Props) {
  if (!request) return null;
  const fullName = `${request.userName ?? ""} ${request.userLastName ?? ""}`.trim();
  const adoptionDate = request.adaptationStartDate ? formatDate(request.adaptationStartDate) : null;

  return (
  <LinearGradient
    colors={["#eeb552ff", "#ffffff"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.card}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <IconSymbol size={30} name="arrow-back" color="white" />
      </Pressable>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={logo} />
        </View>
        <Text style={styles.portalPetTitle}>Portal Pet</Text>
      </View>

      <Text style={styles.title}>¡Mascota adoptada! 🎉</Text>

      <View style={styles.adopterCard}>
        <View style={styles.avatar}>
          {request.userImage ? (
            <Image source={{ uri: request.userImage }} style={styles.avatarImg} />
          ) : (
            <Text style={styles.avatarInitial}>
              {request.userName?.charAt(0).toUpperCase() ?? "?"}
            </Text>
          )}
        </View>
        <Text style={styles.adopterText}>
          Esta mascota fue adoptada por{" "}
          <Text style={styles.adopterName}>{fullName}</Text>
          {adoptionDate && (
            <Text style={styles.adopterText}> el día{" "}
              <Text style={styles.adopterName}>{adoptionDate}</Text>
            </Text>
          )}
        </Text>
      </View>

      <View style={styles.messageBox}>
        <Text style={styles.messageTitle}>¡Gracias por usar Portal Pet!</Text>
        <Text style={styles.messageText}>
          Gente como vos hace la diferencia {"\n"}No pierdas el contacto con el nuevo hogar.
        </Text>
      </View>

      <ContactActions 
        onGoToChat={onGoToChat}
        onOpenProfile={onOpenProfile}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    backButton: {
    position: "absolute",
    top: scale(55),
    left: scale(16),
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 40,
    padding: scale(6),
  },
  card: {
      padding: scale(24),
      alignItems: "center",
      gap: scale(16),
      flex: 1,
      justifyContent: "center",
    },
  header: {
    alignItems: "center",
    gap: scale(6),
  },
  logoContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(18),
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1.5,
    borderColor: "rgba(232, 168, 72, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(10),
  },
  portalPetTitle: {
    fontSize: scale(20),
    fontWeight: "600",
    color: "#ffffffff",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: "#d28716ff",
    textAlign: "center",
    marginVertical: scale(20),
  },
  adopterCard: {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: scale(12),
  width: "100%",
  borderWidth: 1,
  borderColor: "rgba(255,177,61,0.3)",
  borderRadius: 14,
  padding: scale(14),
  backgroundColor: "#fff8ec",
},
adopterText: {
  flex: 1,
  fontSize: scale(13),
  color: "#666",
  lineHeight: scale(20),
  flexShrink: 1,
},
adopterName: {
  fontSize: scale(13),
  fontWeight: "700",
  color: "#151718",
},
  avatar: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    backgroundColor: "rgba(255,177,61,0.15)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffb13d",
  },
  avatarImg: {
    width: scale(52),
    height: scale(52),
  },
  avatarInitial: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: "#ffb13d",
  },
date: {
  fontSize: scale(12),
  color: "#A5A5A5",
},
dateLabel: {
  color: "#ffb13d",
  fontWeight: "600",
},
  messageBox: {
    backgroundColor: "#fff8ec",
    borderRadius: 14,
    padding: scale(16),
    width: "100%",
    gap: scale(6),
    borderLeftWidth: 3,
    borderLeftColor: "#ffb13d",
    borderRightWidth: 3,
    borderRightColor: "#ffb13d",
    marginBottom: scale(20),
  },
  messageTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#ffb13d",
    textAlign: "center",
  },
  messageText: {
    fontSize: scale(13),
    color: "#666",
    textAlign: "center",
    lineHeight: scale(20),
  },
  buttons: {
    flexDirection: "row",
    gap: scale(10),
    width: "100%",
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
    paddingVertical: scale(10),
    borderRadius: 10,
  },
  btnChat: {
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  btnChatText: {
    color: "#ffb13d",
    fontWeight: "600",
    fontSize: scale(13),
  },
  btnProfile: {
    backgroundColor: "#ffb13d",
  },
  btnProfileText: {
    color: "#151718",
    fontWeight: "600",
    fontSize: scale(13),
  },
});