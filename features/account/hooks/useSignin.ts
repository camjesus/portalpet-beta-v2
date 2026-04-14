import { useState } from "react";
import { Platform } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { saveUserAsync } from "@/services/storage/userStorage";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/models";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

GoogleSignin.configure({
  webClientId: extra?.webClientId,
  iosClientId: extra?.iosClientId,
});

export function useSignin() {
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (Platform.OS === "android") {
        await GoogleSignin.hasPlayServices();
      }
      const userInfo = await GoogleSignin.signIn();
      const data = userInfo.data?.user;

      if (data) {
        const user: User = {
          id: data.id,
          name: data.givenName ?? "",
          lastname: data.familyName ?? "",
          email: data.email,
          image: data.photo ?? "",
        };
        await saveUserAsync(user);
        setUser(user);
        router.replace("/(tabs)/home");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("cancelado");
      } else {
        console.error("error signin:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin };
}