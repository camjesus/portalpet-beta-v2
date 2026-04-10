import { Rescuer } from "@/models";
import { useLocalSearchParams, router } from "expo-router";

export function usePetProfile() {
  const { petId, stringItem, image, isMy: isMyParam } = useLocalSearchParams<{
    petId: string;
    stringItem: string;
    image: string;
    isMy: string;
  }>();

  const item = JSON.parse(stringItem);
  const { pet } = item;
  const isMy = isMyParam === "true";

  function goToBack() {
    router.back();
  }

  function goToReport() {
    router.push({ pathname: "/report", params: { petId } });
  }

  function goToChat() {
    router.push({ pathname: "/chat", params: { petString: JSON.stringify(item) } });
  }

const rescuer: Rescuer = pet.rescuer
  ? {
      ...pet.rescuer,
      name: pet.rescuer.name ?? '',
      lastName: pet.rescuer.lastName ?? '',
      image: pet.rescuer.image ?? '',
    }
  : { name: '', lastName: '', image: '' };
  return { pet, image, isMy, rescuer, goToBack, goToReport, goToChat };
}
