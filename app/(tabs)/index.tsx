import { useEffect, useState } from "react";
import { getUserAsync } from "@/services/storage/userStorage";
import { User } from "@/models";
import { router } from "expo-router";

export default function Index() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    getUserAsync().then((storedUser) => {
      setUser(storedUser ?? null);
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
