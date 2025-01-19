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
	dateStart: Date;
	dateStart_string: string;
	active: boolean;
	latitud: string;
	longitud: string;
	idAdopter: string;
	rescuerId: string;
	rescuer: {
		lastName: string;
		name: string;
		uid: string;
	}
	//ubication: undefined; // N/A
};


