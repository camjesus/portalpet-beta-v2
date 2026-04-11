import { useEffect, useState } from "react";
import { router } from "expo-router";
import { User } from "@/models";
import { getUserAsync, saveUserAsync, cleanAllAsync } from "@/services/storage/userStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { updatePetsRescuer } from "@/features/pet/services/petService";

export function useAccount() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    getUserAsync().then((storedUser) => {
      console.log(storedUser);
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
    await updatePetsRescuer(storedUser.id, value);
    await saveUserAsync({ ...storedUser, bio: value });
    console.log("guardado:", await getUserAsync()); 
    setBio(value);
  };

  const clearAll = async () => {
    await cleanAllAsync();
    await GoogleSignin.signOut();
    router.replace("/signin");
  };

  return { name, lastname, email, image, bio, setBio, saveBio, clearAll };
}