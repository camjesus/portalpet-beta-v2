import AsyncStorage from "@react-native-async-storage/async-storage";
import { PetId } from "@/models";

const MY_PETS_KEY = "@myPets";

export const saveMyPets = async (pets: PetId[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(MY_PETS_KEY, JSON.stringify(pets));
  } catch (error) {
    throw new Error("petStorage: saveMyPets failed");
  }
};

export const getMyPets = async (): Promise<PetId[]> => {
  try {
    const pets = await AsyncStorage.getItem(MY_PETS_KEY);

    if (!pets) return [];

    return JSON.parse(pets);
  } catch (error) {
    throw new Error("petStorage: getMyPets failed");
  }
};