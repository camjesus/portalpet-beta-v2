import { useCallback, useState } from "react";
import { findMyPets, markPetAsArchived } from "@/features/pet/services/petService";
import { PetId } from "@/models";
import { useMyPetsStore } from "@/store/myPetsStore";
import { useFocusEffect } from "expo-router";

type FilterType = "active" | "inactive";

export function useMyPets() {
  const [activePets, setActivePets] = useState<PetId[]>([]);
  const [inactivePets, setInactivePets] = useState<PetId[]>([]);
  const [filter, setFilter] = useState<FilterType>("active");
  const filteredPets = filter === "active" ? activePets : inactivePets;

  useFocusEffect(
    useCallback(() => {
      const { myPets, isDirty, setMyPets } = useMyPetsStore.getState();

      if (!isDirty && myPets.length > 0) {
        setActivePets(myPets.filter((p) => !p.pet.archived && p.pet.active));
        setInactivePets(myPets.filter((p) => !p.pet.archived && !p.pet.active));
        return;
      }

      findMyPets().then((pets) => {
        setMyPets(pets);
        setActivePets(pets.filter((p) => !p.pet.archived && p.pet.active));
        setInactivePets(pets.filter((p) => !p.pet.archived && !p.pet.active));
      });
    }, [])
  );

    const handleDelete = async (id: string) => {
      await markPetAsArchived(id);
      setActivePets((prev) => prev.filter((p) => p.id !== id));
      setInactivePets((prev) => prev.filter((p) => p.id !== id));
    };

  return { filteredPets, activePets, inactivePets, filter, setFilter, handleDelete };
}