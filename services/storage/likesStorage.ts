import AsyncStorage from "@react-native-async-storage/async-storage";

const LIKES_KEY = "liked_pets";

export async function getLikedPets(): Promise<string[]> {
  const data = await AsyncStorage.getItem(LIKES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function toggleLike(petId: string): Promise<boolean> {
  const liked = await getLikedPets();
  const isLiked = liked.includes(petId);
  const updated = isLiked
    ? liked.filter((id) => id !== petId)
    : [...liked, petId];
  await AsyncStorage.setItem(LIKES_KEY, JSON.stringify(updated));
  return !isLiked;
}

export async function isLiked(petId: string): Promise<boolean> {
  const liked = await getLikedPets();
  return liked.includes(petId);
}