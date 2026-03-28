import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import {
  saveAdoptionProfile,
  validateAdoptionProfile,
  getAdoptionProfile,
} from "@/features/adoption/services/adoptionService";
import { Validation } from "@/models";

export function useAdoptionProfile() {
  const user = useAuthStore((s) => s.user);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [housingType, setHousingType] = useState<"house" | "apartment">("house");
  const [hasYard, setHasYard] = useState(false);
  const [hasOtherPets, setHasOtherPets] = useState(false);
  const [otherPetsDescription, setOtherPetsDescription] = useState("");
  const [hoursAlone, setHoursAlone] = useState("");
  const [hadPetsBefore, setHadPetsBefore] = useState(false);
  const [previousPetsDescription, setPreviousPetsDescription] = useState("");
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation>();

  useEffect(() => {
    if (!user?.id) return;
    getAdoptionProfile(user.id).then((profile) => {
      if (!profile) return;
      setFullName(profile.fullName ?? "");
      setAddress(profile.address ?? "");
      setHousingType(profile.housingType ?? "house");
      setHasYard(profile.hasYard ?? false);
      setHasOtherPets(profile.hasOtherPets ?? false);
      setOtherPetsDescription(profile.otherPetsDescription ?? "");
      setHoursAlone(profile.hoursAlone?.toString() ?? "");
      setHadPetsBefore(profile.hadPetsBefore ?? false);
      setPreviousPetsDescription(profile.previousPetsDescription ?? "");
    });
  }, [user?.id]);

  const submit = async () => {
    const error = validateAdoptionProfile({
      fullName,
      address,
      hoursAlone: parseInt(hoursAlone) || 0,
      hasOtherPets,
      otherPetsDescription,
      hadPetsBefore,
      previousPetsDescription,
    });

    if (error) {
      setToastConfig(error);
      setToast(true);
      return;
    }

    if (!user?.id) return;

    await saveAdoptionProfile({
      userId: user.id,
      fullName,
      address,
      housingType,
      hasYard,
      hasOtherPets,
      otherPetsDescription,
      hoursAlone: parseInt(hoursAlone) || 0,
      hadPetsBefore,
      previousPetsDescription,
      updatedAt: new Date(),
    });

    router.back();
  };

  return {
    fullName, setFullName,
    address, setAddress,
    housingType, setHousingType,
    hasYard, setHasYard,
    hasOtherPets, setHasOtherPets,
    otherPetsDescription, setOtherPetsDescription,
    hoursAlone, setHoursAlone,
    hadPetsBefore, setHadPetsBefore,
    previousPetsDescription, setPreviousPetsDescription,
    toast, setToast, toastConfig,
    submit,
  };
}