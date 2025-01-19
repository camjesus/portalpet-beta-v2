import { Pet } from '@/models/Pet';
import { db , storage } from "../FirebaseConfig";
import { collection, addDoc, where, query, getDocs, DocumentData, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as Crypto from "expo-crypto";


export const savePetAsync = async (pet:Pet) => {
    if(pet.id === "") pet.id = Crypto.randomUUID();

    const response = await fetch(pet.image);
    const blob = await response.blob();

    const refImage = ref(storage, "petImages/" + pet.id);
    const uploadTask = await uploadBytesResumable(refImage, blob);
    const downloadURL = await getDownloadURL((uploadTask).ref);
    console.log("downloadURL", downloadURL);
    pet.image = downloadURL;
    pet.dateStart = pet.action === "FOUND" ? new Date() : new Date(0,0,0);

    const newDoc = await addDoc(collection(db, "pets"), pet);
    console.log(newDoc);
    console.log("newPet");
    return newDoc;
       
}


export const myPetAsync =  async (id:string) => {
    console.log("entro myPetAsync");
    const myPets: any[] = [];
    const q = query(collection(db, "pets"), where("rescuerId", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        if (doc != null) {
            myPets.push({
                docId: doc.id,
                pet: doc.data()});
          }
      });
    return myPets;
}
