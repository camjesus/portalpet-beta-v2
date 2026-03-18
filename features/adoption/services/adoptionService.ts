import { FIELD_VALIDATION } from "@/constants/Validations";
import { AdoptionProfile, Validation } from "@/models";
import {
  saveAdoptionProfileDoc,
  updateAdoptionProfileDoc,
  getAdoptionProfileByUser,
} from "../repository/AdoptionRepository";

export function validateAdoptionProfile(profile: Partial<AdoptionProfile>): Validation | null {
  if (!profile.fullName?.trim())
    return FIELD_VALIDATION("El nombre completo es obligatorio");
  if (!profile.address?.trim())
    return FIELD_VALIDATION("La dirección es obligatoria");
  if (!profile.hoursAlone && profile.hoursAlone !== 0)
    return FIELD_VALIDATION("Ingresá las horas que estaría sola");
  if (profile.hasOtherPets && !profile.otherPetsDescription?.trim())
    return FIELD_VALIDATION("Describí tus otras mascotas");
  if (profile.hadPetsBefore && !profile.previousPetsDescription?.trim())
    return FIELD_VALIDATION("Contanos qué pasó con tus mascotas anteriores");
  return null;
}
export async function saveAdoptionProfile(profile: AdoptionProfile) {
  const existing = await getAdoptionProfileByUser(profile.userId);
  if (existing) {
    return await updateAdoptionProfileDoc(existing.id, { ...profile, updatedAt: new Date() });
  }
  return await saveAdoptionProfileDoc({ ...profile, updatedAt: new Date() });
}

export async function getAdoptionProfile(userId: string) {
  return await getAdoptionProfileByUser(userId);
}