import { Pet } from "@/models";
import { getUserAsync } from "@/services/storage/userStorage";

export async function loadInitPet(pet: Pet) {
  const user = await getUserAsync();

  if (!user) throw new Error("User not found");

  pet.rescuer = {
    id: user.id,
    name: user.name,
    lastName: user.lastname,
    email: user.email,
  };

  pet.rescuerId = user.id;
  pet.ageInMoths = loadAgeInMonths(pet.age, pet.ageType);
  pet.dateStart = pet.action === "FOUND" ? new Date() : null;

  return pet;
}

export function loadAgeInMonths(age: number, ageType: string) {
  return ageType === "YEAR" ? age * 12 : age;
}