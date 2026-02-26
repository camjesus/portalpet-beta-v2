import React, { useEffect, useReducer, useState } from "react";
import { User } from "@/models";
import * as Google from "expo-auth-session/providers/google";
import { Image, StyleSheet, View, Text } from "react-native";
import {
  GOOGLE_ANDROID_ID,
  GOOGLE_EXPO_ID,
  GOOGLE_IOS_ID,
  GOOGLE_WEB_ID,
} from "@/secret-google";
import { router } from "expo-router";
import ViewCustom from "../../components/ui/ViewCustom";
import { Pressable } from "react-native";
import { scale } from "react-native-size-matters";

import {
  getGoogleUserInfo,
  setDefaultUser,
  setDefaultUser2,
} from "@/service/dataBase/useGoogleSignin";
import * as AuthSession from "expo-auth-session";

import { logo, googleSignin } from "@/assets/images";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

export default function Signin() {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_WEB_ID,
    iosClientId: GOOGLE_IOS_ID,
    webClientId: GOOGLE_WEB_ID,
    redirectUri: AuthSession.makeRedirectUri({
      scheme: "portalpet", // El scheme de tu app.json
    }),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("response", JSON.stringify(response));
    console.log("GOOGLE_ANDROID_ID", JSON.stringify(GOOGLE_ANDROID_ID));

    if (response) {
      console.log("FULL RESPONSE:", response);
    }

    if (response?.type === "success") {
      const { authentication } = response;
      console.log("ACCESS TOKEN:", authentication?.accessToken);
    }

    if (response?.type === "error") {
      console.log("AUTH ERROR:", response.error);
    }
    handleEffect();
  }, [response]);

  function goToHome() {
    router.replace("/(tabs)");
  }

  async function handleEffect() {
    if (response?.type === "success") {
      await getUserInfo(response?.authentication?.accessToken);
    }
  }

  const getUserInfo = async (token: string | undefined) => {
    console.log("antes de entrar a getGoogleUserInfo");

    await getGoogleUserInfo(token).then((user) => {
      console.log("entro a getGoogleUserInfo");

      if (user) {
        setUser(user);
        goToHome();
      }
    });
  };

  const setDefault = async () => {
    await setDefaultUser().then((user) => {
      if (user) {
        setUser(user);
        goToHome();
      }
    });
  };

  const setDefault2 = async () => {
    await setDefaultUser2().then((user) => {
      if (user) {
        setUser(user);
        goToHome();
      }
    });
  };

  const handleLogin = async () => {
    if (!request || loading) return;

    setLoading(true);

    try {
      const result = await promptAsync();
      console.log("PROMPT RESULT:", result);
    } catch (e) {
      console.log("LOGIN ERROR:", e);
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

      <Pressable style={styles.press} onPress={() => handleLogin()}>
        <Image style={styles.image} source={googleSignin} />
      </Pressable>
      <Pressable style={styles.press} onPress={() => setDefault()}>
        <Image style={styles.image} source={googleSignin} />
      </Pressable>
      <Pressable style={styles.press} onPress={() => setDefault2()}>
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
    alignContent: "center",
    alignItems: "center",
  },
  back: {
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
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
