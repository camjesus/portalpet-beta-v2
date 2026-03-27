import { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import { getGoogleUserInfo } from "@/services/dataBase/useGoogleSignin";
import { logo, googleSignin } from "@/assets/images";
import { useAuthStore } from "@/store/authStore";
import {
  GOOGLE_ANDROID_ID,
  GOOGLE_WEB_ID,
  GOOGLE_EXPO_ID,
  GOOGLE_ANDROID_FISICO_ID,
} from "@/secret-google";
import { GoogleButton } from "@/components/ui";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  native: "com.camjesus.portalpetbetav2:/oauthredirect",
});

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_ID,
    androidClientId: GOOGLE_ANDROID_ID,
    scopes: ["profile", "email"],
    usePKCE: true,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type !== "success") return;
    const token = response.authentication?.accessToken;
    if (token) handleUserInfo(token);
  }, [response]);

  const handleUserInfo = async (token: string) => {
    const user = await getGoogleUserInfo(token);
    if (user) {
      setUser(user);
      router.replace("/(tabs)");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await promptAsync({ showInRecents: true, createTask: false });
    } finally {
      setLoading(false);
    }
  };

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

      <GoogleButton onPress={handleLogin} />

      <Text style={styles.terms}>Al continuar aceptás los términos de uso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151718",
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
    color: "rgba(255, 255, 255, 0.45)",
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
  tagline: {
    color: "rgba(255, 255, 255, 0.20)",
    fontSize: scale(12),
    marginTop: scale(8),
    letterSpacing: 0.5,
  },
  press: {
    borderRadius: scale(12),
    overflow: "hidden",
  },
  pressActive: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: scale(220),
    height: scale(46),
  },
  terms: {
    color: "rgba(255, 255, 255, 0.47)",
    fontSize: scale(10),
    marginTop: scale(16),
    letterSpacing: 0.3,
  },
});
