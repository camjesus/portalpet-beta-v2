import AsyncStorage from "@react-native-async-storage/async-storage";

const getPinnedKey = (petId: string) => `pinnedIds_${petId}`;

export const loadPinnedIds = async (petId: string): Promise<Set<string>> => {
  try {
    const stored = await AsyncStorage.getItem(getPinnedKey(petId));
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

export const savePinnedIds = async (petId: string, ids: Set<string>) => {
  try {
    await AsyncStorage.setItem(getPinnedKey(petId), JSON.stringify([...ids]));
  } catch {}
};