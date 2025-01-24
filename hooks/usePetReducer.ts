import { Pet } from '@/models/Pet';

interface Action {
	type: string;

	payload: {
		field: string;
		value: any;
	} 
} 

interface State {
	pet: Pet;
}

export const initalPet: State = {	
	pet: {
		id: "",
		name: '',
		size: 'SMALL',
		type: 'DOG',
		sex: 'FEMALE',
		age: '',
		ageType: 'YEAR',
		description: '',
		image: "./default.png",
		action: 'ADOPTION',
		dateStart: null,
		dateStart_string: null,
		active: true,
		latitud: null,
		longitud:null,
		idAdopter: "",
		rescuerId: null,
		rescuer: null,
		createDate: new Date()
		//ubication: undefined
	}
};

export const ACTION = {
	CHANGE_INPUT: 'changeInput',
};

export const petReducer = (state: State, action: Action) => {
	switch (action.type) {
		case ACTION.CHANGE_INPUT:
				const updatePet = {
				...state.pet,
				[action.payload.field]: action.payload.value
			} ;
				return { pet: updatePet };

		default:
			throw Error('error en petReducer');
	}
};

