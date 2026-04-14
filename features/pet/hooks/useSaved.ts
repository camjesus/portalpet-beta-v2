import { useState } from "react";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getLikedPets } from "@/services/storage/likesStorage";
import { getPetDocById } from "@/features/pet/repository/petRepository";
import { mapPetFromFirestore } from "@/features/pet/mappers/petMapper";
import { PetId, PetWithDistance } from "@/models";
import { getFilters } from "@/features/filter/services/filterStorageService";
import { haversineKm } from "@/services/utils/geo";

export function useSaved() {
  const [pets, setPets] = useState<PetWithDistance[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, []),
  );

async function loadSaved() {
  setLoading(true);
  const ids = await getLikedPets();
  const filter = await getFilters();

  const results = await Promise.all(
    ids.map(async (id) => {
      const doc = await getPetDocById(id);
      if (!doc.exists()) return null;
      const pet = mapPetFromFirestore(doc.id, doc.data());

      const hasLocation =
        filter.latitude && filter.longitude &&
        pet.pet.latitude && pet.pet.longitude;

      const distanceKm = hasLocation
        ? haversineKm(filter.latitude, filter.longitude, pet.pet.latitude!, pet.pet.longitude!)
        : undefined;

      return { ...pet, distanceKm } as PetWithDistance;
    }),
  );
  setPets(results.filter(Boolean) as PetWithDistance[]);
  setLoading(false);
}

  return { pets, loading , setPets};
}