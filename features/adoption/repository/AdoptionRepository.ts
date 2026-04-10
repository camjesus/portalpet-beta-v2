import { db } from "@/FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AdoptionProfile, AdoptionRequest, AdoptionRequestId } from "@/models";

export async function saveAdoptionProfileDoc(profile: AdoptionProfile) {
  return await addDoc(collection(db, "adoptionProfiles"), profile);
}

export async function updateAdoptionProfileDoc(docId: string, profile: Partial<AdoptionProfile>) {
  return await updateDoc(doc(db, "adoptionProfiles", docId), profile);
}

export async function getAdoptionProfileByUser(userId: string) {
  const q = query(
    collection(db, "adoptionProfiles"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data() as AdoptionProfile,
  };
}

export async function saveAdoptionRequestDoc(request: AdoptionRequest) {
  return await addDoc(collection(db, "adoptionRequests"), request);
}

export async function getAdoptionRequestByPetAndUser(petId: string, userId: string) {
  const q = query(
    collection(db, "adoptionRequests"),
    where("petId", "==", petId),
    where("userId", "==", userId),
    where("status", "==", "pending")
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() as AdoptionRequest };
}

export async function updateAdoptionRequestDoc(docId: string, data: Partial<AdoptionRequest>) {
  return await updateDoc(doc(db, "adoptionRequests", docId), data);
}

export async function getAdoptionRequestByPetId(petId: string): Promise<AdoptionRequest[]> {
  const q = query(
    collection(db, "adoptionRequests"),
    where("petId", "==", petId),
    where("status", "==", "pending")
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return [];
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() as AdoptionRequest }));
}

export async function getAllAdoptionRequestsByPetId(petId: string): Promise<AdoptionRequestId[]> {
  const q = query(
    collection(db, "adoptionRequests"),
    where("petId", "==", petId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data() as AdoptionRequest,
  }));
}

export async function getAdoptionRequestByChatId(chatId: string) {
  const q = query(
    collection(db, "adoptionRequests"),
    where("chatId", "==", chatId)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() as AdoptionRequest };
}