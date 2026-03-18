export interface AdoptionProfile
{
  userId: string,
  fullName: string,
  address: string,
  housingType: "house" | "apartment",
  hasYard: boolean,
  hasOtherPets: boolean,
  otherPetsDescription: string,
  hoursAlone: number,
  hadPetsBefore: boolean,
  previousPetsDescription: string,
  updatedAt: Date,
}