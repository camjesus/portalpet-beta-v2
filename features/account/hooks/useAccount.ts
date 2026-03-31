import { useEffect, useState } from "react";
import { router } from "expo-router";
import { User } from "@/models";
import { getUserAsync, saveUserAsync, cleanAllAsync } from "@/services/storage/userStorage";

export function useAccount() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    getUserAsync().then((storedUser) => {
      if (!storedUser) return;
      setName(storedUser.name ?? "");
      setLastname(storedUser.lastname ?? "");
      setEmail(storedUser.email ?? "");
      setImage(storedUser.image ?? "");
      setBio(storedUser.bio ?? "");
    });
  }, []);

  const saveBio = async (value: string) => {
    const storedUser = await getUserAsync();
    if (!storedUser) return;
    await saveUserAsync({ ...storedUser, bio: value });
    setBio(value);
  };

  const clearAll = async () => {
    await cleanAllAsync();
    router.replace("/signin");
  };

  return { name, lastname, email, image, bio, setBio, saveBio, clearAll };
}