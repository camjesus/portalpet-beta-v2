import { AgeType, Filter } from "@/models";

interface Action {
  type: string;

  payload: {
    field: string;
    value: any;
  };
}

export interface State {
  filter: Filter;
}

export const initalFilter: State = {
  filter: {
    size: ["SMALL", "MEDIUM", "BIG"],
    type: ["DOG", "CAT"],
    sex: ["FEMALE", "MALE"],
    from: {
      age: 1,
      ageType: AgeType.MONTH,
    },
    until: {
      age: 12,
      ageType: AgeType.MONTH,
    },
    action: 0,
    latitud: null,
    longitud: null,
  },
};

export const ACTION = {
  CHANGE_FILTER: "changeFilter",
  CHANGE_OBJECT: "changeObject",
  CHANGE_FROM: "changeFrom",
  CHANGE_UNTIL: "changeUntil",
};

export const filterReducer = (state: State, action: Action) => {
  console.log(state);
  console.log(action);
  console.log(action.payload.value);
  switch (action.type) {
    case ACTION.CHANGE_FILTER:
      return {
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value,
        },
      };
    case ACTION.CHANGE_FROM:
      return {
        filter: {
          ...state.filter,
          from: {
            ...state.filter.from,
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case ACTION.CHANGE_UNTIL:
      return {
        filter: {
          ...state.filter,
          until: {
            ...state.filter.until,
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case ACTION.CHANGE_OBJECT:
      return { filter: action.payload.value };
    default:
      throw Error("error Reducers: useFilter: filterReducer");
  }
};