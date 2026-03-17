import { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import { getGoogleUserInfo } from "@/services/dataBase/useGoogleSignin";
import { logo, googleSignin } from "@/assets/images";
import ViewCustom from "@/components/ui/ViewCustom";
import { useAuthStore } from "@/store/authStore";
import { GOOGLE_ANDROID_ID, GOOGLE_WEB_ID } from "@/secret-google";
WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  native: "com.camjesus.portalpetbetav2:/oauthredirect",
});

export default function Signin() {
  //const GOOGLE_ANDROID_ID = process.env.GOOGLE_ANDROID_ID!;
  //const GOOGLE_WEB_ID = process.env.GOOGLE_WEB_ID!;
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
    <ViewCustom>
      <View style={styles.back}>
        <Image style={styles.logoImage} source={logo} />
        <Text style={styles.text}>Bienvenido a </Text>
        <Text style={styles.title}>Portal pet</Text>
      </View>

      <Pressable
        style={styles.press}
        onPress={handleLogin}
        disabled={!request || loading}>
        <Image style={styles.image} source={googleSignin} />
      </Pressable>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  image: {
    width: scale(225),
    height: scale(47),
    margin: 10,
  },
  logoImage: {
    width: scale(70),
    height: scale(70),
    margin: 15,
  },
  press: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(120),
    marginBottom: scale(40),
  },
  title: {
    color: "#ffb13d",
    fontSize: scale(25),
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: scale(20),
  },
});
