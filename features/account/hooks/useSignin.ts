import { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { getGoogleUserInfo } from "@/services/dataBase/useGoogleSignin";
import { useAuthStore } from "@/store/authStore";
import { GOOGLE_ANDROID_ID, GOOGLE_WEB_ID } from "@/secret-google";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  native: "com.camjesus.portalpetbetav2:/oauthredirect",
});

export function useSignin() {
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

  return { loading, handleLogin };
}
