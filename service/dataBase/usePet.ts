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
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getUserAsync } from "@/service/storeData/useUser";
import { getFilters, getAction } from "./useFilter";
import { Pet, PetId, User, AgeType } from "@/models";
import { ACCTIONS } from "@/constants/StaticData";
import { dataToPetMap } from "../mapping/useMapping";

//public
export const savePetAsync = async (petId: string, pet: Pet) => {
  const edit = petId ? true : false;
  const user = await getUserAsync();

  pet = loadInitPet(pet, user);
  pet.image =
    pet.image.substring(0, 5) !== "https"
      ? await loadImage(user.id, pet)
      : pet.image;

  if (edit) {
    try {
      const docRef = doc(db, "pets", petId);
      await updateDoc(docRef, pet);
    } catch (error) {
      throw Error("error DataBase: UsePet: savePetAsync.updateDoc" + error);
    }
  } else {
    await addDoc(collection(db, "pets"), pet);
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
      myPets.push(dataToPetMap(doc.id,doc.data()));
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
    filter.from.ageType === AgeType.YEAR ? filter.from.age * 12 : filter.from.age;

  var until =
    filter.until.ageType === AgeType.YEAR ? filter.until.age * 12 : filter.until.age;

    console.log(from);
    console.log(until);

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

  console.log("{ user: user, myPets: myPets, filter: filter, action: action }")
  console.log(filter.from);
  console.log(filter.until);
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

//private
function loadInitPet(pet: Pet, user: User) {
  if (pet.name === "") pet.name = "No tiene";

  pet.rescuer = {
    id: user.id,
    name: user.name,
    lastName: user.lastname,
    email: user.email,
  };
  pet.rescuerId = user.id;
  pet.ageInMoths =
    pet.age !== null && pet.ageType === "YEAR" ? pet.age * 12 : pet.age;
  pet.dateStart = pet.action === "FOUND" ? new Date() : null;

  return pet;
}

async function loadImage(id: string | null, pet: Pet) {
  const response = await fetch(pet.image);
  const blob = await response.blob();
  const refImage = ref(
    storage,
    "petImages/" + id + Math.floor(Math.random() * 1000),
  );
  const uploadTask = await uploadBytesResumable(refImage, blob);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
}
