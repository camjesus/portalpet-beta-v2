import { FIELD_VALIDATION } from "@/constants/Validations";
import { AdoptionProfile, AdoptionRequestId, Validation } from "@/models";
import {
  saveAdoptionProfileDoc,
  updateAdoptionProfileDoc,
  getAdoptionProfileByUser,
  getAdoptionRequestByPetAndUser,
  saveAdoptionRequestDoc,
  updateAdoptionRequestDoc,
  getAdoptionRequestByPetId,
  getAllAdoptionRequestsByPetId,
  getAcceptedRequestByPetId,
} from "../repository/AdoptionRepository";
import { markPetAsAdapting, markPetAsAdopted, markPetAsAdoption } from "@/features/pet/services/petService";
import { useMyPetsStore } from "@/store/myPetsStore";

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

import { getChatDocAsync, updateChatAdoptionStatus } from "@/features/chat/repository/chatRepository";
import { sendAdoptionAcceptedMessage, sendAdoptionRejectedMessage, sendPetAdoptedNotification, sendPetAdoptionCancelledNotification, sendPetInAdaptationNotification } from "@/features/chat/services/messageService";

export async function sendAdoptionRequest(
  userId: string,
  petId: string,
  rescuerId: string,
  chatId: string,
  userName?: string,
  userLastName?: string,
  userImage?: string,
): Promise<"sent" | "already_sent"> {
  const existing = await getAdoptionRequestByPetAndUser(petId, userId);
  if (existing) return "already_sent";

  const profile = await getAdoptionProfileByUser(userId);
  if (!profile) throw new Error("No profile");

  await saveAdoptionRequestDoc({
    userId,
    petId,
    rescuerId,
    chatId,
    adoptionProfileId: profile.id,
    userName,
    userLastName,
    userImage,
    status: "pending",
    createdAt: new Date(),
  });

  await updateChatAdoptionStatus(chatId, "pending");

  return "sent";
}

export async function getAdoptionRequestsByPet(petId: string) {
  const requests = await getAllAdoptionRequestsByPetId(petId);
  const withProfiles = await Promise.all(
    requests.map(async (request) => {
      const profile = await getAdoptionProfileByUser(request.userId);
      return { request, profile };
    })
  );
  return withProfiles;
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

export async function cancelAdoptionRequest(
  userId: string,
  petId: string,
  chatId: string,
) {
  const request = await getAdoptionRequestByPetAndUser(petId, userId);
  if (!request) return;
  await updateAdoptionRequestDoc(request.id, { status: "cancelled" });
  await updateChatAdoptionStatus(chatId, "cancelled");
}

export const startAdaptation = async (requestId: string, petId: string) => {
  await updateAdoptionRequestDoc(requestId, {
    status: "adapting",
    adaptationStartDate: new Date(),
  });
  await markPetAsAdapting(petId);
  useMyPetsStore.getState().invalidate();
};

export const cancelAdaptation = async (requestId: string, petId: string) => {
  await updateAdoptionRequestDoc(requestId, {
    status: "accepted", 
    adaptationStartDate: null,
  });
    await markPetAsAdoption(petId);
  useMyPetsStore.getState().invalidate();
};

export const cancelAdoption = async (request: AdoptionRequestId) => {
  await updateAdoptionRequestDoc(request.id, {
    adaptationStartDate: null,
    status: "rejected",
  });
  const chat = await getChatDocAsync(request.chatId);
  if (chat) await sendAdoptionRejectedMessage(chat, undefined);
  await markPetAsAdoption(request.petId);
  await sendPetAdoptionCancelledNotification(request.petId);
  useMyPetsStore.getState().invalidate();
};  

export const finishAdaptation = async (requestId: string, petId: string, adopterId: string) => {
  await updateAdoptionRequestDoc(requestId, { status: "adopted" });
  await markPetAsAdopted(petId, adopterId);
  useMyPetsStore.getState().invalidate();
  await sendPetAdoptedNotification(petId);
};

export const rejectAdoptionRequest = async (request: AdoptionRequestId) => {
  await updateAdoptionRequestStatus(request.id, "rejected", request.chatId);
  const chat = await getChatDocAsync(request.chatId);
  if (chat) await sendAdoptionRejectedMessage(chat, undefined);
};

export const acceptAdoptionRequest = async (request: AdoptionRequestId): Promise<"accepted" | "already_accepted"> => {
  const existing = await getAcceptedRequestByPetId(request.petId);
  if (existing) return "already_accepted";

  await updateAdoptionRequestStatus(request.id, "accepted", request.chatId);
  const chat = await getChatDocAsync(request.chatId);
  if (chat) await sendAdoptionAcceptedMessage(chat, undefined);
  await sendPetInAdaptationNotification(request.petId);
  
  return "accepted";
};