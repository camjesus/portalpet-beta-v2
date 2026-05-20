import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { CatMedicalRecord, DogMedicalRecord } from "@/models";

export function useLoadMedicalRecord() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedState = stringItem ? JSON.parse(stringItem) : null;
  const pet = parsedState.statePet.pet;
  const petType: string = pet.type;
  const existing = pet.medicalRecord as (DogMedicalRecord & CatMedicalRecord) | undefined;

  // Comunes
  const [neutered, setNeutered] = useState(existing?.neutered ?? false);
  const [dewormingInternal, setDewormingInternal] = useState(existing?.dewormingInternal ?? false);
  const [dewormingExternal, setDewormingExternal] = useState(existing?.dewormingExternal ?? false);
  const [chronicCondition, setChronicCondition] = useState(existing?.chronicCondition ?? false);
  const [chronicConditionDetail, setChronicConditionDetail] = useState(existing?.chronicConditionDetail ?? "");
  const [specialCare, setSpecialCare] = useState(existing?.specialCare ?? false);
  const [specialCareDetail, setSpecialCareDetail] = useState(existing?.specialCareDetail ?? "");

  // Perro
  const [vaccineSextuple, setVaccineSextuple] = useState(existing?.vaccineSextuple ?? false);
  const [vaccineRabies, setVaccineRabies] = useState(existing?.vaccineRabies ?? false);
  const [vaccineBordetella, setVaccineBordetella] = useState(existing?.vaccineBordetella ?? false);

  // Gato
  const [vaccineTriple, setVaccineTriple] = useState(existing?.vaccineTriple ?? false);
  const [vaccineFeLV, setVaccineFeLV] = useState(existing?.vaccineFeLV ?? false);
  const [FIVPositive, setFIVPositive] = useState(existing?.FIVPositive ?? false);
  const [FeLVPositive, setFeLVPositive] = useState(existing?.FeLVPositive ?? false);

  function next() {
    const base = {
      neutered,
      dewormingInternal,
      dewormingExternal,
      chronicCondition,
      chronicConditionDetail: chronicCondition ? chronicConditionDetail : "",
      specialCare,
      specialCareDetail: specialCare ? specialCareDetail : "",
    };

    const medicalRecord: DogMedicalRecord | CatMedicalRecord =
      petType === "DOG"
        ? { ...base, vaccineSextuple, vaccineRabies, vaccineBordetella }
        : { ...base, vaccineTriple, vaccineFeLV, vaccineRabies, FIVPositive, FeLVPositive };

    const updatedState = {
      ...parsedState,
      statePet: {
        ...parsedState.statePet,
        pet: { ...pet, medicalRecord },
      },
    };

    router.push({
      pathname: "/managementPet/loadCharacteristics",
      params: { stringItem: JSON.stringify(updatedState) },
    });
  }

  return {
    petType,
    // comunes
    neutered, setNeutered,
    dewormingInternal, setDewormingInternal,
    dewormingExternal, setDewormingExternal,
    chronicCondition, setChronicCondition,
    chronicConditionDetail, setChronicConditionDetail,
    specialCare, setSpecialCare,
    specialCareDetail, setSpecialCareDetail,
    // perro
    vaccineSextuple, setVaccineSextuple,
    vaccineRabies, setVaccineRabies,
    vaccineBordetella, setVaccineBordetella,
    // gato
    vaccineTriple, setVaccineTriple,
    vaccineFeLV, setVaccineFeLV,
    FIVPositive, setFIVPositive,
    FeLVPositive, setFeLVPositive,
    next,
  };
}
