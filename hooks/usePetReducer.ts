import { Pet } from '@/models/Pet';

interface Action {
	type: string;

	payload: {
		field: string;
		value: string;
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
		dateStart: new Date(0,0,0),
		dateStart_string: "",
		active: true,
		latitud: "",
		longitud:"",
		idAdopter: "",
		rescuerId: "4dede6e5-504c-4f46-8339-9d6280a693b0",
		rescuer: {
			lastName: "Palermo",
			name: "Martin",
			uid: "4dede6e5-504c-4f46-8339-9d6280a693b0",
		}
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
			throw Error('error');
	}
};
