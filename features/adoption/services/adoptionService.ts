import { FIELD_VALIDATION } from "@/constants/Validations";
import { AdoptionProfile, Validation } from "@/models";
import {
  saveAdoptionProfileDoc,
  updateAdoptionProfileDoc,
  getAdoptionProfileByUser,
  getAdoptionRequestByPetAndUser,
  saveAdoptionRequestDoc,
  updateAdoptionRequestDoc,
  getAdoptionRequestByPetId
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

import { updateChatAdoptionStatus } from "@/features/chat/repository/chatRepository";

export async function sendAdoptionRequest(
  userId: string,
  petId: string,
  rescuerId: string,
  chatId: string,
): Promise<"sent" | "already_sent"> {
  const existing = await getAdoptionRequestByPetAndUser(petId, userId);
  if (existing) return "already_sent";

  const profile = await getAdoptionProfileByUser(userId);
  if (!profile) throw new Error("No profile");

  await saveAdoptionRequestDoc({
    userId,
    petId,
    rescuerId,
    adoptionProfileId: profile.id,
    status: "pending",
    createdAt: new Date(),
  });

  await updateChatAdoptionStatus(chatId, "pending");

  return "sent";
}

export async function getAdoptionRequestByPet(petId: string) {
  return await getAdoptionRequestByPetId(petId);
}

export async function updateAdoptionRequestStatus(
  docId: string,
  status: "accepted" | "rejected",
  chatId: string,
) {
  await updateAdoptionRequestDoc(docId, { status });
  await updateChatAdoptionStatus(chatId, status);
}