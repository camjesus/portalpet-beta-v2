import React, { useEffect, useState } from "react";
import { User } from "@/models/User";
import * as Google from "expo-auth-session/providers/google";
import { Image, StyleSheet, View, Text } from "react-native";
import {
  GOOGLE_ANDROID_ID,
  GOOGLE_IOS_ID,
  GOOGLE_WEB_ID,
} from "@/secret-google";
import { router } from "expo-router";
import ViewCustom from "@/components/ViewCustom";
import { Pressable } from "react-native";
import { scale } from "react-native-size-matters";
import { getGoogleUserInfo } from "@/service/dataBase/useGoogleSignin";

export default function Signin() {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_ANDROID_ID,
    iosClientId: GOOGLE_IOS_ID,
    webClientId: GOOGLE_WEB_ID,
  });

  useEffect(() => {
    handleEffect();
  }, [response]);

  function goToHome() {
    router.push("/(tabs)");
  }

  async function handleEffect() {
    if (response?.type === "success") {
      await getUserInfo(response?.authentication?.accessToken);
    }
  }

  const getUserInfo = async (token: string | undefined) => {
    await getGoogleUserInfo(token).then((user) => {
      if (user) {
        setUser(user);
        goToHome();
      }
    });
  };

  return (
    <ViewCustom>
      <View style={styles.back}>
        <Image
          style={styles.logoImage}
          source={require("@/assets/images/house_paw.png")}
        />
        <Text style={styles.text}>Bienvenido a </Text>
        <Text style={styles.title}>Portal pet</Text>
      </View>

      <Pressable style={styles.press} onPress={() => promptAsync()}>
        <Image
          style={styles.image}
          source={require("@/assets/images/googleSignin.png")}
        />
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
