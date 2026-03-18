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

export const initialFilter: State = {
  filter: {
    size: [],
    type: [],
    sex: [],
    from: {
      age: 1,
      ageType: AgeType.MONTH,
    },
    until: {
      age: 12,
      ageType: AgeType.MONTH,
    },
    action: 0,
    latitude: 0,
    longitude: 0,
    radiusKm: 10,
  },
};

export const ACTION = {
  CHANGE_FILTER: "changeFilter",
  CHANGE_OBJECT: "changeObject",
  CHANGE_FROM: "changeFrom",
  CHANGE_UNTIL: "changeUntil",
  CHANGE_LOCATION: "changeLocation",
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
    case ACTION.CHANGE_LOCATION:
      return {
        filter: {
          ...state.filter,
          latitud: action.payload.value.lat,
          longitud: action.payload.value.lng,
        },
      };
    case ACTION.CHANGE_OBJECT:
      return { filter: action.payload.value };
    default:
      throw Error("error Reducers: useFilter: filterReducer");
  }
};
