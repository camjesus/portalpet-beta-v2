import { initialPet, petReducer } from "@/hooks/reducers/usePet";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useReducer } from "react";

export default function ManagementPet() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedPet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(
    petReducer,
    parsedPet ? { statePet: parsedPet } : initialPet,
  );

  useEffect(() => {
    if (stringItem) {
      router.push({
        pathname: "/managementPet/loadData",
        params: {
          stringItem: JSON.stringify(state),
          image: encodeURI(state.statePet.pet.image),
        },
      });
    } else
      router.push({
        pathname: "/managementPet/loadImage",
        params: { stringItem: JSON.stringify(state) },
      });
  }, []);

  return null;
}
