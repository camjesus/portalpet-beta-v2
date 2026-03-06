import { LABEL_SIZE } from "@/constants/StaticData";
import { AgeType, Size, Pet } from "@/models";
//public
export const loadPet = (pet:Pet) => {
  let name = loadName(pet);
  var [action, color] =  loadAction(pet.action);
  return { name: name, action: action, color: color };
}

export function loadLabels(size: string[]) {
  const opt0 = size.indexOf(Size.SMALL) > -1;
  const opt1 = size.indexOf(Size.MEDIUM) > -1;
  const opt2 = size.indexOf(Size.BIG) > -1;
  let labelInit: string[] = [];
  
  if (opt0) {
    labelInit.unshift(LABEL_SIZE[0]);
  }
  if (opt1) {
    labelInit.push(LABEL_SIZE[1]);
  }
  if (opt2) {
    labelInit.push(LABEL_SIZE[2]);
  }

  return labelInit;
}

export function calculateAgeByMonths(age: number) {
  return age * 12;
}

export function loadAction(petAction:string) {
  let action = "";
  let color = "";
  switch (petAction) {
    case "ADOPTION":
      action = "ADOPCIÓN";
      color = "#9D69A3";
      break;
    case "WANTED":
      action = "BUSCADO";
      color = "#C73E1D";
      break;
    case "FOUND":
      action = "ENCONTRADO";
      color = "#2E86AB";
      break;
    default:
      return action;
  }
  return [action, color];
}

//private
function loadName(pet:Pet) {
  const name = pet.name === "" ? "No tiene" : pet.name;
  
  let ageType = "";
  if (pet.age === 1) {
    if (pet.ageType === AgeType.YEAR) {
      ageType = "Año";
    } else {
      ageType = "Mes";
    }
  } else {
    if (pet.ageType === AgeType.YEAR) {
      ageType = "Años";
    } else {
      ageType = "Meses";
    }
  }

  return `${name}, ${pet.age} ${ageType} `;
}

