import { Image, StyleSheet, View, Text } from "react-native";
import { scale } from "react-native-size-matters";
import { logo } from "@/assets/images";
import { GoogleButton } from "@/components/ui";

type Props = {
  loading: boolean;
  handleLogin: () => void;
};

export function SigninView({ loading, handleLogin }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.halo} />

      <View style={styles.back}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={logo} />
        </View>
        <Text style={styles.subtitle}>Bienvenido a</Text>
        <Text style={styles.title}>Portal Pet</Text>
      </View>

      <GoogleButton onPress={handleLogin} disabled={loading} />

      <Text style={styles.terms}>Al continuar aceptás los términos de uso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    top: "25%",
    alignSelf: "center",
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    backgroundColor: "rgba(255, 177, 61, 0.10)",
  },
  back: {
    alignItems: "center",
    marginBottom: scale(52),
  },
  logoContainer: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(22),
    backgroundColor: "rgba(255, 177, 61, 0.2)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 177, 61, 0.42)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(24),
    shadowColor: "#ffb13d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  logoImage: {
    width: scale(58),
    height: scale(58),
    borderRadius: scale(12),
  },
  subtitle: {
    color: "#151718",
    fontSize: scale(12),
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: scale(4),
  },
  title: {
    color: "#ffb13d",
    fontSize: scale(30),
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  terms: {
    color: "#686868ff",
    fontSize: scale(10),
    marginTop: scale(16),
    letterSpacing: 0.3,
  },
});
