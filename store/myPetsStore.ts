import { create } from "zustand";
import { PetId } from "@/models";

interface MyPetsStore {
  myPets: PetId[];
  isDirty: boolean;
  setMyPets: (pets: PetId[]) => void;
  invalidate: () => void;
}

export const useMyPetsStore = create<MyPetsStore>((set) => ({
  myPets: [],
  isDirty: true,
  setMyPets: (pets) => set({ myPets: pets, isDirty: false }),
  invalidate: () => set({ isDirty: true }),
}));