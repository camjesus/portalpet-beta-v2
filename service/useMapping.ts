import { PetId, Pet } from "@/models/Pet";

export function jsonToPetMapping(stringPet:string){
    const jsonPet = JSON.parse(stringPet);
    console.log("jsonPet prue", jsonPet.name)
    
    console.log("stringPet", stringPet)
    console.log("jsonPet", JSON.stringify(stringPet))
}