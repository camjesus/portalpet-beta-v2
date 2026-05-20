export type MedicalRecordBase = {
  dewormingInternal: boolean;
  dewormingExternal: boolean;
  neutered: boolean;
  chronicCondition: boolean;
  chronicConditionDetail: string;
  specialCare: boolean;
  specialCareDetail: string;
};

export type DogMedicalRecord = MedicalRecordBase & {
  vaccineSextuple: boolean;
  vaccineRabies: boolean;
  vaccineBordetella: boolean;
};

export type CatMedicalRecord = MedicalRecordBase & {
  vaccineTriple: boolean;
  vaccineFeLV: boolean;
  vaccineRabies: boolean;
  FIVPositive: boolean;
  FeLVPositive: boolean;
};

export type MedicalRecord = DogMedicalRecord | CatMedicalRecord;
