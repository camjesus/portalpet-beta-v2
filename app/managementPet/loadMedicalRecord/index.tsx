import { Link } from "expo-router";
import { ViewCustom, IconSymbol, HeaderCustom } from "@/components/ui";
import { MedicalRecordForm } from "@/components/managementPet/MedicalRecordForm";
import { useLoadMedicalRecord } from "@/features/pet/hooks/useLoadMedicalRecord";

export default function LoadMedicalRecord() {
  const props = useLoadMedicalRecord();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Ficha médica"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      <MedicalRecordForm
        petType={props.petType}
        neutered={props.neutered} setNeutered={props.setNeutered}
        dewormingInternal={props.dewormingInternal} setDewormingInternal={props.setDewormingInternal}
        dewormingExternal={props.dewormingExternal} setDewormingExternal={props.setDewormingExternal}
        chronicCondition={props.chronicCondition} setChronicCondition={props.setChronicCondition}
        chronicConditionDetail={props.chronicConditionDetail} setChronicConditionDetail={props.setChronicConditionDetail}
        specialCare={props.specialCare} setSpecialCare={props.setSpecialCare}
        specialCareDetail={props.specialCareDetail} setSpecialCareDetail={props.setSpecialCareDetail}
        vaccineSextuple={props.vaccineSextuple} setVaccineSextuple={props.setVaccineSextuple}
        vaccineRabies={props.vaccineRabies} setVaccineRabies={props.setVaccineRabies}
        vaccineBordetella={props.vaccineBordetella} setVaccineBordetella={props.setVaccineBordetella}
        vaccineTriple={props.vaccineTriple} setVaccineTriple={props.setVaccineTriple}
        vaccineFeLV={props.vaccineFeLV} setVaccineFeLV={props.setVaccineFeLV}
        FIVPositive={props.FIVPositive} setFIVPositive={props.setFIVPositive}
        FeLVPositive={props.FeLVPositive} setFeLVPositive={props.setFeLVPositive}
        onNext={props.next}
      />
    </ViewCustom>
  );
}
