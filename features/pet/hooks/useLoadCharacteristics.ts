import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { savePetAsync } from "@/features/pet/services/petService";
import { useMyPetsStore } from "@/store/myPetsStore";
import { PetCharacteristics } from "@/models";

export function useLoadCharacteristics() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedState = stringItem ? JSON.parse(stringItem) : null;
  const pet = parsedState.statePet.pet;
  const existing = pet.characteristics as PetCharacteristics | undefined;

  const [goodWithKids, setGoodWithKids] = useState(existing?.goodWithKids ?? false);
  const [goodWithDogs, setGoodWithDogs] = useState(existing?.goodWithDogs ?? false);
  const [goodWithCats, setGoodWithCats] = useState(existing?.goodWithCats ?? false);
  const [load, setLoad] = useState(false);

  async function save() {
    const characteristics: PetCharacteristics = { goodWithKids, goodWithDogs, goodWithCats };
    const finalPet = { ...pet, characteristics };

    setLoad(true);
    useMyPetsStore.getState().invalidate();
    await savePetAsync(parsedState.statePet.id, finalPet);
    router.push("/(tabs)/myPets");
    setLoad(false);
  }

  return {
    goodWithKids, setGoodWithKids,
    goodWithDogs, setGoodWithDogs,
    goodWithCats, setGoodWithCats,
    load,
    save,
  };
}
