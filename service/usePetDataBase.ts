import { Pet } from '@/models/Pet';
import { db , storage } from "../FirebaseConfig";
import { collection, addDoc, where, query, getDocs, orderBy , doc, updateDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as Crypto from "expo-crypto";
import { getUserAsync, savePetsAsync } from '@/hooks/useStoreData';
import { User } from '@/models/User';
import { Filter } from '@/models/Filter';
import { ACCTIONS } from '@/constants/StaticData';
import { getFilterAsync, saveFilterAsync } from '@/hooks/useFilterStoreData';
import { useState } from 'react';
import { initalFilter } from '@/hooks/useFilterReducer';



//public
export const savePetAsync = async (pet:Pet, user:User|any) => {
    pet = loadInitPet(pet, user);
    pet.image = await loadImage(pet);

    const newDoc = await addDoc(collection(db, "pets"), pet).then();
    console.log(newDoc);
    console.log("newPet");
    
    return newDoc;
}

export const myPetAsync =  async () => {
    console.log("entro myPetAsync");
    const user = await getUserAsync();
    //console.log("user ", user);
    const myPets: any[] = [];
    const q = query(collection(db, "pets"), 
                where("rescuerId", "==", user.uid),
                where("active", "==", true), 
                orderBy("createDate", "desc"));

    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        if (doc != null) {
            myPets.push({
                docId: doc.id,
                pet: doc.data()});
          }
      });
      savePetsAsync(myPets);
    return {user: user, myPets:myPets};
}


export const findPetsAsync =  async (action:number, isFirst:boolean, isUndefined:boolean) => {
    console.log("entro findPetsAsync");
    const user = await getUserAsync();
    //console.log("user ", user);
    let filter = await getFilters();
    let filterAction = action;
    if(isFirst && isUndefined)
        filterAction = filter.action;

    filter.action = isFirst && !isUndefined ? filter.action : action;
    const myPets: any[] = [];

                const q = query(collection(db, "pets"), 
                //where("rescuerId", "!=", user.uid),
                where("active", "==", true), 
                where("action", "==", ACCTIONS[filter.action]), 
                where("sex", "in", filter.sex), 
                where("size", "in", filter.size), 
                where("age", ">=", filter.ageFrom), 
                where("age", "<=", filter.ageTo), 
                where("ageType", "==", filter.ageType), 
                where("type", "in", filter.type), 
                orderBy("createDate", "desc"));
        console.log("query",q);
        console.log("action", action)
        console.log("ACCTIONS[filter.action]", ACCTIONS[filter.action])
        const querySnapshot = await getDocs(q);
        console.log("filter getFilters", filter);

        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        if (doc != null) {
            myPets.push({
                docId: doc.id,
                pet: doc.data()});
        }
        });
        //savePetsAsync(myPets);
        !isFirst && await saveFilterAsync(JSON.stringify(filter));
    
    
    return {user: user, myPets:myPets, filter: filter};
}

export const disablePetAsync =  async (id:string) => {
    console.log("entro disablePetAsync");
    const petId = doc(db, "pets", id);
    await updateDoc(petId, { active: false });
}

//private
function loadInitPet(pet:Pet, user:User)
{
    if(pet.id === "") pet.id = Crypto.randomUUID();

    if(pet.name === "") pet.name = "No tiene";

    pet.rescuer = {
        uid: user.uid,
        name: user.name,
        lastName: user.lastname
    };
    pet.rescuerId = user.uid;
    pet.dateStart = pet.action === "FOUND" ? new Date() : null;

    return pet;
}

async function loadImage(pet:Pet){
    const response = await fetch(pet.image);
    const blob = await response.blob();
    const refImage = ref(storage, "petImages/" + pet.id);
    const uploadTask = await uploadBytesResumable(refImage, blob);
    const downloadURL = await getDownloadURL((uploadTask).ref);
    console.log("downloadURL", downloadURL);
    return downloadURL;
}

async function  getFilters() : Promise<Filter> {
     return await getFilterAsync().then((filter) => {
        console.log("filter getFilters", filter);
        return filter === null ? initalFilter.filter : filter;
    });
    
}