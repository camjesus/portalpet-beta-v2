import { PetId } from "@/models";
import { create } from "zustand";

interface PetsStore {
  myPets: PetId[];
  isDirty: boolean;
  setMyPets: (pets: PetId[]) => void;
  invalidate: () => void;
}

export const usePetsStore = create<PetsStore>((set) => ({
  myPets: [],
  isDirty: true,
  setMyPets: (pets) => set({ myPets: pets, isDirty: false }),
  invalidate: () => set({ isDirty: true }),
}));