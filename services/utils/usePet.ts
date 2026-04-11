import { LABEL_SIZE , ACCTIONS, ACTION_CONFIG, ActionConfig, ActionType } from "@/constants/StaticData";
import { AgeType, Size, Pet } from "@/models";

type PetData = {
  name: string;
  action: string;
  color: string;
};

const DEFAULT_ACTION: ActionConfig = { label: "", color: "" };

//public
export const loadPet = (pet: Pet): PetData => {
  const { label, color } = loadAction(pet.action);
  return { name: loadName(pet), action: label, color };
};

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

export function loadAction(petAction: string): ActionConfig {
  return ACTION_CONFIG[petAction as ActionType] ?? DEFAULT_ACTION;
}

//private
function loadName(pet:Pet) {
  const name = pet.name === "" ? "Sin nombre" : pet.name;
  
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

