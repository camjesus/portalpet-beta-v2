import { Pet, PetId, Rescuer, User, Validation } from "@/models";
import { getMyPetsAsync, saveMyPetsAsync } from "../storeData/usePets";
import { myPetAsync, saveAsync, updateAsync } from "../dataBase/usePet";
import { FIELD_VALIDATION, OK_VALIDATION } from "@/constants/Validations";
import { getUserAsync } from "../storeData/useUser";

export async function findMyPetsAsync(search: boolean): Promise<PetId[]> {
  if (search) {
    console.log("lo busco en dataBase");
    var myPets = await myPetAsync();
    await saveMyPetsAsync(myPets);
    return myPets;
  } else {
    console.log("lo busco en storage");
    var storagePet = await getMyPetsAsync();
    return storagePet;
  }
}

export async function savePetAsync(petId: string, pet: Pet) {
  if (petId) {
    pet.ageInMoths = loadAgeInMonths(pet.age, pet.ageType);
    await updateAsync(petId, pet);
  } else {
    const newPet = await loadInitPet(pet);
    await saveAsync(newPet);
  }
}

export function validatePet(pet: Pet, noName: boolean) {
  if (pet.name === "" && !noName)
    return FIELD_VALIDATION("Es necesario ingresar un nombre.");

  console.log("pet.age" + pet.age);
  if (pet.age === 0) return FIELD_VALIDATION("Es necesario ingresar una edad.");

  if (pet.description === "")
    return FIELD_VALIDATION("Es necesario ingresar alguna descripción.");

  return OK_VALIDATION;
}

//private
async function loadInitPet(pet: Pet) {
  const user = await getUserAsync();
  
  pet.rescuer = {
    id: user.id,
    name: user.name,
    lastName: user.lastname,
    email: user.email,
  } as Rescuer;
  pet.rescuerId = user.id ;
  pet.ageInMoths = loadAgeInMonths(pet.age, pet.ageType);
  pet.dateStart = pet.action === "FOUND" ? new Date() : null;

  return pet;
}

function loadAgeInMonths(age: number, ageType: string) {
  return ageType === "YEAR" ? age * 12 : age;
}


