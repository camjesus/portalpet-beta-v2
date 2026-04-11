import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { scale } from "react-native-size-matters";
import { logo } from "@/assets/images";
import IconSymbol from "./IconSymbol";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  title: string;
  description: string;
};

export function FinishedView({ title, description }: Props) {
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

        <Text style={styles.title}>{title}</Text>

        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{description}</Text>
        </View>
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
    marginBottom: scale(30),
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
    marginBottom: scale(16),
  },
  messageBox: {
    backgroundColor: "#fff8ec",
    borderRadius: 14,
    padding: scale(16),
    width: "100%",
    borderLeftWidth: 3,
    borderLeftColor: "#ffb13d",
    borderRightWidth: 3,
    borderRightColor: "#ffb13d",
  },
  messageText: {
    fontSize: scale(13),
    color: "#666",
    textAlign: "center",
    lineHeight: scale(20),
  },
});