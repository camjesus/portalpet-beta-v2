import { Pet } from "@/models/Pet";
const default_image = "./components/default.png";

export const loadPet = (pet:Pet) => {
    let name = loadName(pet);
    var [action, color] =  loadAction(pet);
    console.log(name, action, color);
    return {name, action, color};
}

function loadName(pet:Pet) {
    let ageType = "";
    if (pet.age === "1") {
      if (pet.ageType === "YEAR") {
        ageType = "Año";
      } else {
        ageType = "Mes";
      }
    } else {
      if (pet.ageType === "YEAR") {
        ageType = "Años";
      } else {
        ageType = "Meses";
      }
    }

    return `${pet.name}, ${pet.age} ${ageType} `;
  }

  function loadAction(pet:Pet) {
    let action = "";
    let color = "";
    switch (pet.action) {
      case "ADOPTION":
        action = "ADOPCIÓN";
        color = "#9D69A3";
        break;
      case "WANTED":
        action = "LO BUSCO";
        color = "#C73E1D";
        break;
      case "FOUND":
        action = "LO ENCONTRÉ";
        color = "#2E86AB";
        break;
      default:
        return action;
    }
    return [action, color];
  }

  export function validatePet(pet:Pet, noName:boolean)
  {
    var errorMessage: string = "";

    if (pet.name === "" && !noName) 
      return errorMessage = "Es necesario ingresar un nombre."

    if (pet.age === "") 
      return errorMessage = "Es necesario ingresar una edad."

    if (pet.description === "") 
      return errorMessage = "Es necesario ingresar alguna descripción."

    if (pet.image === default_image) 
      return errorMessage = "Es necesario ingresar alguna imagen."

    return errorMessage;
  }

  export function getNumberOption(labelOpt:string)
  {
    
  }
