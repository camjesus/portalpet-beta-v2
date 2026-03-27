import { useEffect, useState } from "react";
import { router } from "expo-router";
import { User } from "@/models";
import { getUserAsync, cleanAllAsync } from "@/services/storage/userStorage";

export function useAccount() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserAsync().then((storedUser) => {
      if (!storedUser) return;
      setName(storedUser.name ?? "");
      setLastname(storedUser.lastname ?? "");
      setEmail(storedUser.email ?? "");
    });
  }, []);

  const clearAll = async () => {
    await cleanAllAsync();
    router.replace("/signin");
  };

  return { name, lastname, email, clearAll };
}