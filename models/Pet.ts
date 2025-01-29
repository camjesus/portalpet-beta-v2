export type Pet = {
	id: string;
	name: string; //NO_NAME
	size: string; //SMALL - MEDIUM - BIG
	type: string; //DOG - CAT
	sex: string; //FAMALE - MALE
	age: string;
	ageType: string;
	description: string;
	image: string;
	action: string; //ADOPTION - WANTED - FOUND
	dateStart: Date | null;
	dateStart_string: string| null;
	active: boolean;
	latitud: string| null;
	longitud: string| null;
	idAdopter: string| null;
	rescuerId: string| null;
	rescuer: {
		lastName: string;
		name: string;
		uid: string;
	} | null;
	createDate: Date;
	//ubication: undefined; // N/A
};

export interface PetId {
	docId: string;
	pet: Pet;
  }
