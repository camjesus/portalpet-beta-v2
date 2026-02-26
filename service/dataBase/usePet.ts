import { db, storage } from "../../FirebaseConfig";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getUserAsync } from "@/service/storeData/useUser";
import { getFilters, getAction } from "./useFilter";
import { Pet, PetId, User, AgeType } from "@/models";
import { ACCTIONS } from "@/constants/StaticData";
import { dataToPetMap } from "../mapping/useMapping";
import * as Crypto from "expo-crypto";

//public
export const saveAsync = async (pet: Pet) => {
  try {
    const image = await loadImage(pet.image);
    if (image) {
      pet.image = image;
    }

    await addDoc(collection(db, "pets"), pet);
  } catch (error) {
    throw Error("error DataBase: UsePet: savePetAsync.updateDoc" + error);
  }
};

export const updateAsync = async (petId: string, pet: Pet) => {
      console.log(" updateAsync petObj ", pet.size);

  const sanitizePetUpdate = (pet: Pet) => {
    const { createDate, rescuer, image, rescuerId, ...rest } = pet;
    return rest;
  };

  try {
    const image = await loadImage(pet.image);
    if (image) {
      pet.image = image;
    }
    await updateDoc(doc(db, "pets", petId), sanitizePetUpdate(pet));
  } catch (error) {
    throw Error("error DataBase: UsePet: updatePetAsync" + error);
  }
};

export const myPetAsync = async () => {
  const user = await getUserAsync();
  const myPets: PetId[] = [];

  const q = query(
    collection(db, "pets"),
    where("rescuerId", "==", user.id),
    where("active", "==", true),
    orderBy("createDate", "desc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc != null) {
      myPets.push(dataToPetMap(doc.id, doc.data()));
    }
  });

  return myPets;
};

export const findPetsAsync = async () => {
  let myPets: PetId[] = [];
  const user = await getUserAsync();
  let filter = await getFilters();
  let action = await getAction();

  var from =
    filter.from.ageType === AgeType.YEAR
      ? filter.from.age * 12
      : filter.from.age;

  var until =
    filter.until.ageType === AgeType.YEAR
      ? filter.until.age * 12
      : filter.until.age;

  const q = query(
    collection(db, "pets"),
    where("active", "==", true),
    where("action", "==", ACCTIONS[action]),
    where("sex", "in", filter.sex),
    where("size", "in", filter.size),
    where("ageInMoths", ">=", from),
    where("ageInMoths", "<=", until),
    where("type", "in", filter.type),
    where("rescuerId", "!=", user.id),
    orderBy("createDate", "desc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    if (doc != null) {
      myPets.push(dataToPetMap(doc.id, doc.data()));
    }
  });
  return { user: user, myPets: myPets, filter: filter, action: action };
};

export const disablePetAsync = async (id: string) => {
  try {
    const petId = doc(db, "pets", id);
    await updateDoc(petId, { active: false });
  } catch (error) {
    throw Error("error DataBase: UsePet: disablePetAsync" + error);
  }
};

async function uploadImage(image: string) {
  const response = await fetch(image);
  const blob = await response.blob();

  const id = Crypto.randomUUID();
  const refImage = ref(storage, `petImages/${id}`);
  const uploadTask = await uploadBytesResumable(refImage, blob);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
}

async function loadImage(image: string) {
  const imageDB =
    image.substring(0, 5) !== "https" ? await uploadImage(image) : null;
  return imageDB;
}

export const getByIdAsync = async (id: string) => {
  try {
    const petId = doc(db, "pets", id);
    
      const petDoc = await getDoc(petId);
            console.log(id)

      console.log(JSON.stringify(petDoc))
      return dataToPetMap(petDoc.id, petDoc.data());
  } catch (error) {
    throw Error("error DataBase: UsePet: disablePetAsync" + error);
  }
};