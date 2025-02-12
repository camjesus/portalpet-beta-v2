import { Filter } from '@/models/Filter';

interface Action {
    type: string;

    payload: {
        field: string;
        value: any;
    } 
} 

export interface State {
    filter: Filter;
}

export const initalFilter: State = {	
    filter: {
        size: ["SMALL", "MEDIUM" , "BIG"],
        type: ['DOG', 'CAT'],
        sex: ['FEMALE','MALE'],
        ageFrom: 1,
        ageTo: 11,
        ageType: 'MONTH',
        action: 0,
        latitud: null,
        longitud:null,
    }
};

export const ACTION = {
    CHANGE_FILTER: 'changeFilter',
    CHANGE_OBJECT: "changeObject"
};

export const filterReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTER:
            return { filter: {
                ...state.filter,
                [action.payload.field]: action.payload.value
            }  };
        case ACTION.CHANGE_OBJECT:    
        return { filter: action.payload.value };
        default:
            throw Error('error Reducers: useFilter: filterReducer');
    }
};

