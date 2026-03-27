import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { findMyPets } from "@/features/pet/services/petService";
import { PetId } from "@/models";

export function useMyPets() {
  const [myPets, setMyPets] = useState<PetId[]>([]);

  const { search } = useLocalSearchParams<{ search: string }>();
  const shouldSearch = search === "yes" || search === undefined;

  useEffect(() => {
    findMyPets(shouldSearch).then((res) => {
      setMyPets(res);
    });
  }, []);

  return { myPets };
}