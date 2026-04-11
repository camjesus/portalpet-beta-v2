import { useEffect, useState } from "react";
import { getUserAsync } from "@/services/storage/userStorage";
import { User } from "@/models";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const setAuthUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    getUserAsync().then((storedUser) => {
      const u = storedUser ?? null;
      setUser(u);
      setAuthUser(u);
    });
  }, []);

  useEffect(() => {
    if (user === undefined) return;
    if (user) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/signin");
    }
  }, [user]);

  return null;
}