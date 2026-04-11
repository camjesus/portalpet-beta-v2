import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/models";

const USER_KEY = "@user";

export const getUserAsync = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    if (!user) return null;
    return JSON.parse(user);
  } catch (error) {
    console.error("getUserAsync error", error);
    throw new Error("StoreData:getUserAsync failed");
  }
};

export const saveUserAsync = async (user: User) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUserAsync = async () => {
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