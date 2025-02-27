import { useEffect, useState } from "react";
import { getUserAsync } from "@/service/storeData/useUser";
import { User } from "@/models/User";
import Signin from "../signin";
import { router } from "expo-router";

export default function Search() {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    await getUserAsync().then((user) => {
      setUser(user);
    });
  };

  useEffect(() => {
    if (user === null) {
      getUser();
    } else {
      router.push("/(tabs)/home");
    }
  }, [user]);

  return <>{!user && <Signin />}</>;
}
