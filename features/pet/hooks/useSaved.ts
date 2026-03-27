import { useState } from "react";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getLikedPets } from "@/services/storage/likesStorage";
import { getPetDocById } from "@/features/pet/repository/petRepository";
import { mapPetFromFirestore } from "@/features/pet/mappers/petMapper";
import { PetId } from "@/models";

export function useSaved() {
  const [pets, setPets] = useState<PetId[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, []),
  );

  async function loadSaved() {
    setLoading(true);
    const ids = await getLikedPets();
    const results = await Promise.all(
      ids.map(async (id) => {
        const doc = await getPetDocById(id);
        if (!doc.exists()) return null;
        return mapPetFromFirestore(doc.id, doc.data());
      }),
    );
    setPets(results.filter(Boolean) as PetId[]);
    setLoading(false);
  }

  return { pets, loading };
}