import { Filter } from '@/models/Filter';

interface Action {
    type: string;

    payload: {
        field: string;
        value: any;
    } 
} 

interface State {
    filter: Filter;
}

export const initalFilter: State = {	
    filter: {
        size: 'SMALL',
        type: 'DOG',
        sex: 'FEMALE',
        age: '0',
        ageType: 'YEAR',
        action: 'ADOPTION',
        latitud: null,
        longitud:null,
    }
};

export const ACTION = {
    CHANGE_FILTER: 'changeFilter',
};

export const filterReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTER:
            return { filter: {
                ...state.filter,
                [action.payload.field]: action.payload.value
            }  };

        default:
            throw Error('error en filterReducer');
    }
};

