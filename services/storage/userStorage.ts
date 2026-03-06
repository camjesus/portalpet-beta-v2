import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/models";

const USER_KEY = "@user";

let cachedUser: User | null = null;

export const getUserAsync = async (): Promise<User | null> => {
  if (cachedUser) return cachedUser;

  try {
    const user = await AsyncStorage.getItem(USER_KEY);

    if (!user) return null;

    cachedUser = JSON.parse(user);

    return cachedUser;
  } catch (error) {
    console.error("getUserAsync error", error);
    throw new Error("StoreData:getUserAsync failed");
  }
};

export const saveUserAsync = async (user: User) => {
  cachedUser = user;

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUserAsync = async () => {
  cachedUser = null;

  await AsyncStorage.removeItem(USER_KEY);
};

export const getCurrentUser = async () => {
  const user = await getUserAsync();

  if (!user) {
    throw new Error("User not logged");
  }

  return user;
}

export const cleanAllAsync = async (): Promise<void> => {
  await AsyncStorage.clear();
};