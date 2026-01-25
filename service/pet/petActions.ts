import { PetId } from "@/models";
import { getMyPetsAsync, saveMyPetsAsync } from "../storeData/usePets";
import { myPetAsync } from "../dataBase/usePet";

export async function findMyPetsAsync(search: boolean): Promise<PetId[]> {
  if (search) {
    console.log("lo busco en dataBase");
    var myPets = await myPetAsync();
    await saveMyPetsAsync(myPets);
    return myPets;
  } else {
    console.log("lo busco en storage");
    var storagePet = await getMyPetsAsync();
    return storagePet;
  }
}

export async function savePetAsync(pet:PetId) {
    
}
