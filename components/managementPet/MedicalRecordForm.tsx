import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { CheckBox, Button, TextInputCustom } from "@/components/ui";

type Props = {
  petType: string;
  // comunes
  neutered: boolean; setNeutered: React.Dispatch<React.SetStateAction<boolean>>;
  dewormingInternal: boolean; setDewormingInternal: React.Dispatch<React.SetStateAction<boolean>>;
  dewormingExternal: boolean; setDewormingExternal: React.Dispatch<React.SetStateAction<boolean>>;
  chronicCondition: boolean; setChronicCondition: React.Dispatch<React.SetStateAction<boolean>>;
  chronicConditionDetail: string; setChronicConditionDetail: (v: string) => void;
  specialCare: boolean; setSpecialCare: React.Dispatch<React.SetStateAction<boolean>>;
  specialCareDetail: string; setSpecialCareDetail: (v: string) => void;
  // perro
  vaccineSextuple: boolean; setVaccineSextuple: React.Dispatch<React.SetStateAction<boolean>>;
  vaccineRabies: boolean; setVaccineRabies: React.Dispatch<React.SetStateAction<boolean>>;
  vaccineBordetella: boolean; setVaccineBordetella: React.Dispatch<React.SetStateAction<boolean>>;
  // gato
  vaccineTriple: boolean; setVaccineTriple: React.Dispatch<React.SetStateAction<boolean>>;
  vaccineFeLV: boolean; setVaccineFeLV: React.Dispatch<React.SetStateAction<boolean>>;
  FIVPositive: boolean; setFIVPositive: React.Dispatch<React.SetStateAction<boolean>>;
  FeLVPositive: boolean; setFeLVPositive: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
};

export function MedicalRecordForm({
  petType,
  neutered, setNeutered,
  dewormingInternal, setDewormingInternal,
  dewormingExternal, setDewormingExternal,
  chronicCondition, setChronicCondition,
  chronicConditionDetail, setChronicConditionDetail,
  specialCare, setSpecialCare,
  specialCareDetail, setSpecialCareDetail,
  vaccineSextuple, setVaccineSextuple,
  vaccineRabies, setVaccineRabies,
  vaccineBordetella, setVaccineBordetella,
  vaccineTriple, setVaccineTriple,
  vaccineFeLV, setVaccineFeLV,
  FIVPositive, setFIVPositive,
  FeLVPositive, setFeLVPositive,
  onNext,
}: Props) {
  const isDog = petType === "DOG";

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
      <Text style={styles.sectionTitle}>Vacunas</Text>

      {isDog ? (
        <>
          <CheckBox label="Séxtuple" active={vaccineSextuple} onPress={setVaccineSextuple} />
          <CheckBox label="Rabia" active={vaccineRabies} onPress={setVaccineRabies} />
          <CheckBox label="Bordetella" active={vaccineBordetella} onPress={setVaccineBordetella} />
        </>
      ) : (
        <>
          <CheckBox label="Triple felina" active={vaccineTriple} onPress={setVaccineTriple} />
          <CheckBox label="Leucemia felina (FeLV)" active={vaccineFeLV} onPress={setVaccineFeLV} />
          <CheckBox label="Rabia" active={vaccineRabies} onPress={setVaccineRabies} />
        </>
      )}
      </View>
      <View style={styles.container}>

      <Text style={styles.sectionTitle}>Desparasitación</Text>
      <CheckBox label="Antiparasitario interno" active={dewormingInternal} onPress={setDewormingInternal} />
      <CheckBox label="Antiparasitario externo" active={dewormingExternal} onPress={setDewormingExternal} />
      </View>

      <View style={styles.container}>
      <Text style={styles.sectionTitle}>Estado sanitario</Text>
      <CheckBox label="Castrado / Esterilizado" active={neutered} onPress={setNeutered} />

      {!isDog && (
        <>
          <CheckBox label="VIF positivo (inmunodeficiencia)" active={FIVPositive} onPress={setFIVPositive} />
          <CheckBox label="Leucemia felina positivo" active={FeLVPositive} onPress={setFeLVPositive} />
        </>
      )}
      </View>

      <View style={styles.container}>
      <Text style={styles.sectionTitle}>Salud</Text>

      <CheckBox label="Tiene enfermedad crónica" active={chronicCondition} onPress={setChronicCondition} />
      {chronicCondition && (
        <View style={styles.detail}>
          <TextInputCustom
            multiline
            label="¿Cuál?"
            options={{
              value: chronicConditionDetail,
              onChangeText: setChronicConditionDetail,
              placeholder: "Descripción de la enfermedad...",
            }}
          />
        </View>
      )}

      <CheckBox label="Requiere cuidados especiales" active={specialCare} onPress={setSpecialCare} />
      {specialCare && (
        <View style={styles.detail}>
          <TextInputCustom
            multiline
            label="¿Cuáles?"
            options={{
              value: specialCareDetail,
              onChangeText: setSpecialCareDetail,
              placeholder: "Descripción de los cuidados...",
            }}
          />
        </View>
      )}
      </View>

      <View style={styles.button}>
        <Button label="Siguiente" onPress={onNext} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ffb13d",
    borderRadius: 10,
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    gap: scale(10),
  },
  scroll: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(40),
    gap: scale(14),
    marginTop: scale(10)
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: scale(14),
    color: "#151718",
    marginTop: scale(8),
  },
  detail: {
    marginTop: scale(-6),
  },
  button: {
    alignItems: "center",
    marginTop: scale(10),
  },
});
