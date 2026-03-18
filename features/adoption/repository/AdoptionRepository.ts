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
import { AdoptionProfile } from "@/models";

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