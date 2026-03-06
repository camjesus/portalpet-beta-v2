import { PetId } from "@/models";

export function mapPetFromFirestore(id: string, data: any): PetId {
  return {
    id,
    pet: data,
  };
}