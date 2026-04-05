import React, { useRef } from "react";
import { View, ScrollView, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import {
  ViewCustom,
  HeaderCustom,
  IconSymbol,
  Button,
  TextInputCustom,
  Toast,
  ToggleButton,
} from "@/components/ui";
import { useAdoptionProfile } from "@/features/adoption/hooks/useAdoptionProfile";

export default function AdoptionRequestForm() {
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    fullName,
    setFullName,
    address,
    setAddress,
    housingType,
    setHousingType,
    hasYard,
    setHasYard,
    hasOtherPets,
    setHasOtherPets,
    otherPetsDescription,
    setOtherPetsDescription,
    hoursAlone,
    setHoursAlone,
    hadPetsBefore,
    setHadPetsBefore,
    previousPetsDescription,
    setPreviousPetsDescription,
    toast,
    setToast,
    toastConfig,
    submit,
    submitLabel,
    handleBack
  } = useAdoptionProfile();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Formulario"
        childrenLeft={
          <Pressable onPress={handleBack}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: scale(10), flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          bounces={false}
          overScrollMode="never">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Perfil adoptante</Text>
            <IconSymbol name="paw" size={30} color="#ffb13d" />
          </View>
          <View style={{ gap: scale(10) }}>
            <TextInputCustom
              label="Nombre completo"
              options={{
                value: fullName,
                onChangeText: setFullName,
                placeholder: "Tu nombre completo",
              }}
            />
            <TextInputCustom
              label="Dirección"
              options={{
                value: address,
                onChangeText: setAddress,
                placeholder: "Tu dirección",
              }}
            />
            <TextInputCustom
              label="¿Cuántas horas estaría sola la mascota?"
              options={{
                value: hoursAlone,
                onChangeText: setHoursAlone,
                placeholder: "Ej: 4",
                keyboardType: "numeric",
              }}
            />
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>¿Tenés otras mascotas?</Text>
              <View style={styles.toggleRow}>
                <ToggleButton
                  label="Sí"
                  value={hasOtherPets}
                  onPress={() => setHasOtherPets(true)}
                />
                <ToggleButton
                  label="No"
                  value={!hasOtherPets}
                  onPress={() => setHasOtherPets(false)}
                />
              </View>
            </View>
            {hasOtherPets && (
              <TextInputCustom
                label="¿Cuáles?"
                options={{
                  value: otherPetsDescription,
                  onChangeText: setOtherPetsDescription,
                  placeholder: "Describí tus mascotas",
                }}
                multiline
              />
            )}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>¿Tuviste mascotas antes?</Text>
              <View style={styles.toggleRow}>
                <ToggleButton
                  label="Sí"
                  value={hadPetsBefore}
                  onPress={() => setHadPetsBefore(true)}
                />
                <ToggleButton
                  label="No"
                  value={!hadPetsBefore}
                  onPress={() => setHadPetsBefore(false)}
                />
              </View>
            </View>
            {hadPetsBefore && (
              <TextInputCustom
                label="¿Qué pasó con ellas?"
                options={{
                  value: previousPetsDescription,
                  onChangeText: setPreviousPetsDescription,
                  placeholder: "Contanos un poco",
                }}
                multiline
              />
            )}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Tipo de vivienda</Text>
              <View style={styles.toggleRow}>
                <ToggleButton
                  label="Casa"
                  value={housingType === "house"}
                  onPress={() => setHousingType("house")}
                />
                <ToggleButton
                  label="Departamento"
                  value={housingType === "apartment"}
                  onPress={() => setHousingType("apartment")}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>¿Tenés patio?</Text>
              <View style={styles.toggleRow}>
                <ToggleButton
                  label="Sí"
                  value={hasYard}
                  onPress={() => setHasYard(true)}
                />
                <ToggleButton
                  label="No"
                  value={!hasYard}
                  onPress={() => setHasYard(false)}
                />
              </View>
            </View>
            <View style={styles.submit}>
              <Button label={submitLabel} onPress={submit} />
            </View>
          </View>
        </ScrollView>
      </View>
      {toast && toastConfig && (
        <View style={styles.toastContainer}>
          <Toast validation={toastConfig} setToast={setToast} />
        </View>
      )}
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(12),
    marginTop: scale(10),
  },
  sectionLabel: {
    color: "#151718",
    fontWeight: "bold",
    marginBottom: scale(8),
    fontSize: scale(13),
  },
  toggleRow: {
    flexDirection: "row",
    gap: scale(10),
  },
  submit: {
    marginTop: scale(10),
    marginBottom: scale(30),
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    marginBottom: scale(5),
    marginTop: scale(5),
  },
  title: {
    color: "#151718",
    fontSize: scale(18),
    fontWeight: "bold",
  },
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
