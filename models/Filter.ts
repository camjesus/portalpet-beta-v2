export type Filter = {
	size: string[] ; //SMALL - MEDIUM - BIG
	type: string[]; //DOG - CAT
	sex: string[]; //FAMALE - MALE
	from: {
		age: number;
		ageType: string;
	},
		until: {
		age: number;
		ageType: string;
	}
	action: number; //ADOPTION - WANTED - FOUND
	latitude: number;
	longitude: number;
	radiusKm: number;
}