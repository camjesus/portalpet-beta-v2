import { db } from "@/FirebaseConfig";
import { PetId } from "@/models";
import { getUserAsync } from "@/services/storage/userStorage";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { mapPetFromFirestore } from "../mappers/petMapper";
export const createPetDoc = async (pet: any) => {
  return await addDoc(collection(db, "pets"), pet);
};

export const updatePetDoc = async (petId: string, pet: any) => {
  return await updateDoc(doc(db, "pets", petId), pet);
};

export const getPetsByRescuer = async (rescuerId: string) => {
  const q = query(
    collection(db, "pets"),
    where("rescuerId", "==", rescuerId),
    where("active", "==", true),
    orderBy("createDate", "desc")
  );

  return await getDocs(q);
};

export const getMyPets = async (): Promise<PetId[]> => {
  const user = await getUserAsync();

  if (!user?.id) return [];

  const snapshot = await getPetsByRescuer(user.id);

  const pets: PetId[] = [];

  snapshot.forEach((doc) => {
    pets.push(mapPetFromFirestore(doc.id, doc.data()));
  });

  return pets;
};

export const queryPets = async (filters: any) => {
  const q = query(
    collection(db, "pets"),
    where("active", "==", true),
    where("action", "==", filters.action),
    where("sex", "in", filters.sex),
    where("size", "in", filters.size),
    where("ageInMoths", ">=", filters.from),
    where("ageInMoths", "<=", filters.until),
    where("type", "in", filters.type),
    where("rescuerId", "!=", filters.userId),
    orderBy("createDate", "desc")
  );

  return await getDocs(q);
};

export const disablePetDoc = async (id: string) => {
  return await updateDoc(doc(db, "pets", id), { active: false });
};

export const getPetDocById = async (id: string) => {
  return await getDoc(doc(db, "pets", id));
};

