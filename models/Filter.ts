export type Filter = {
	size: string | null; //SMALL - MEDIUM - BIG
	type: string| null; //DOG - CAT
	sex: string| null; //FAMALE - MALE
	age: string| null;
	ageType: string| null;
	action: string; //ADOPTION - WANTED - FOUND
	latitud: string| null;
	longitud: string| null;
}