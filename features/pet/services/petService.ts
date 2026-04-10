import { Pet, PetId, AgeType, PetWithDistance } from "@/models";
import { getCurrentUser, getUserAsync } from "@/services/storage/userStorage";
import { ACCTIONS } from "@/constants/StaticData";
import { mapPetFromFirestore } from "../mappers/petMapper";

import {
  createPetDoc,
  updatePetDoc,
  getPetsByRescuer,
  queryPets,
  disablePetDoc,
  getPetDocById,
} from "../repository/petRepository";

import { resolvePetImage } from "../storage/petImageStorage";
import { FIELD_VALIDATION, OK_VALIDATION } from "@/constants/Validations";
import { loadAgeInMonths, loadInitPet } from "../utils/petHelper";
import { saveMyPets } from "@/services/storage/petStorage";
import { getAction, getFilters } from "@/features/filter/services/filterStorageService";
import { saveFilter } from "@/features/filter/services/filterService";
import { getCurrentLocation } from "@/services/utils/location";
import { haversineKm } from "@/services/utils/geo";

export const savePet = async (pet: Pet) => {
  const image = await resolvePetImage(pet.image);

  if (image) pet.image = image;

  await createPetDoc(pet);
};

export const updatePet = async (petId: string, pet: Pet) => {
  const image = await resolvePetImage(pet.image);
  pet.image = image ?? pet.image;
  const { createDate, rescuer, rescuerId, ...rest } = pet;

  await updatePetDoc(petId, rest);
};

export const getMyPets = async (): Promise<PetId[]> => {
  const user = await getCurrentUser();

  const snapshot = await getPetsByRescuer(user.id);

  const pets: PetId[] = [];

  snapshot.forEach((doc) => {
    pets.push(mapPetFromFirestore(doc.id, doc.data()));
  });

  return pets;
};

export const findPets = async () => {
  const user = await getUserAsync();
  const filter = await getFilters();
  const action = await getAction();

    if (!filter.latitude || !filter.longitude) {
    const coords = await getCurrentLocation();
    if (coords) {
      filter.latitude = coords.lat;
      filter.longitude = coords.lng;
      await saveFilter({ ...filter, latitude: coords.lat, longitude: coords.lng });
    }
  }
  
  const from =
    filter.from.ageType === AgeType.YEAR
      ? filter.from.age * 12
      : filter.from.age;

  const until =
    filter.until.ageType === AgeType.YEAR
      ? filter.until.age * 12
      : filter.until.age;

  const snapshot = await queryPets({
    action: ACCTIONS[action],
    sex: filter.sex,
    size: filter.size,
    type: filter.type,
    from,
    until,
    userId: user?.id ?? "",
  });

const hasLocation =
  filter.latitude != null && filter.latitude !== 0 &&
  filter.longitude != null && filter.longitude !== 0 &&
  filter.radiusKm;
  
const filteredDocs = hasLocation
  ? snapshot.docs.filter((doc) => {
      const data = doc.data();
      if (!data.latitude || !data.longitude) return false;
      return haversineKm(
        filter.latitude,
        filter.longitude,
        data.latitude,
        data.longitude
      ) <= filter.radiusKm;
    })
  : snapshot.docs;

const pets: PetWithDistance[] = filteredDocs.map((doc) => {
  const pet = mapPetFromFirestore(doc.id, doc.data());

  if (hasLocation && doc.data().latitude && doc.data().longitude) {
    const distanceKm = haversineKm(
      filter.latitude,
      filter.longitude,
      doc.data().latitude,
      doc.data().longitude
    );
    return { ...pet, distanceKm };
  }

  return pet;
});

  return {
    user,
    myPets: pets,
    filter,
    action,
  };
};

export const disablePet = async (id: string) => {
  await disablePetDoc(id);
};

export const getPetById = async (id: string) => {
  const petDoc = await getPetDocById(id);

  return mapPetFromFirestore(petDoc.id, petDoc.data());
};

export function validatePet(pet: Pet, noName: boolean) {
  if (pet.name === "" && !noName)
    return FIELD_VALIDATION("Es necesario ingresar un nombre.");

  console.log("pet.age" + pet.age);
  if (pet.age === 0) return FIELD_VALIDATION("Es necesario ingresar una edad.");

  if (pet.description === "")
    return FIELD_VALIDATION("Es necesario ingresar alguna descripción.");

  return OK_VALIDATION;
}

export async function savePetAsync(petId: string | null, pet: Pet) {
  if (petId) {
    pet.ageInMoths = loadAgeInMonths(pet.age, pet.ageType);
    return updatePet(petId, pet);
  }

  const newPet = await loadInitPet(pet);
  return savePet(newPet);
}

export async function findMyPets(search: boolean): Promise<PetId[]> {
  if (search) {
    console.log("lo busco en dataBase");
    var myPets = await getMyPets();
    await saveMyPets(myPets);
    return myPets;
  } else {
    console.log("lo busco en storage");
    var storagePet = await getMyPets();
    return storagePet;
  }
}

export const updatePetsRescuer = async (rescuerId: string, bio: string) => {
  const snapshot = await getPetsByRescuer(rescuerId);
  const updates = snapshot.docs.map((doc) =>
    updatePetDoc(doc.id, { "rescuer.bio": bio })
  );
  await Promise.all(updates);
};

export const markPetAsAdopted = async (petId: string, adopterId: string) => {
  await updatePetDoc(petId, {
    active: false,
    idAdopter: adopterId,
  });
};