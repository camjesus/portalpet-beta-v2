import { Rescuer } from "./Rescuer";

export type Pet = {
	name: string; //NO_NAME
	size: string; //SMALL - MEDIUM - BIG
	type: string; //DOG - CAT
	sex: string; //FAMALE - MALE
	age: number; 
	ageInMoths: number;
	ageType: string; //MONTH - YEAR
	description: string;
	image: string;
	action: string; //ADOPTION - WANTED - FOUND
	dateStart: Date | null;
	dateStart_string: string| null;
	active: boolean;
	latitude: string| null;
	longitude: string| null;
	idAdopter: string| null;
	rescuerId: string;
	rescuer: Rescuer;
	createDate: Date ;
	//ubication: undefined; // N/A
};

export interface PetId {
	id: string;
	pet: Pet;
  }
