import { defaultImg } from "@/assets/images";
import { defaultRescuer } from "@/constants/StaticData";
import { PetId } from "@/models";

interface Action {
  type: string;

  payload: {
    field: string;
    value: any;
  };
}

interface State {
  statePet: PetId;
}

export const initialPet: State = {
  statePet: {
    id: "",
    pet: {
      name: "",
      size: "SMALL",
      type: "DOG",
      sex: "FEMALE",
      ageInMoths: 0,
      age: 0,
      ageType: "YEAR",
      description: "",
      image: defaultImg,
      action: "ADOPTION",
      dateStart: null,
      dateStart_string: null,
      active: true,
      latitude: "",
      longitude: "" ,
      idAdopter: "",
      rescuerId: "",
      rescuer: defaultRescuer,
      createDate: new Date(),
      //ubication: undefined
    },
  },
};

export const ACTION = {
  CHANGE_INPUT: "changeInput",
};

export const petReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION.CHANGE_INPUT:
      return {
        ...state,
        statePet: {
          ...state.statePet,
          pet: {
            ...state.statePet.pet,
            [action.payload.field]: action.payload.value,
          },
        },
      };

    default:
      return state;
  }
};


