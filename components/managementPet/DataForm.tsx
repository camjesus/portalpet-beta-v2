import React, { RefObject } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { scale } from "react-native-size-matters";
import { Button, Toast, InputAge } from "@/components/ui";
import {
  InputName,
  InputSize,
  InputType,
  InputSex,
  InputAction,
  InputDescription,
} from "@/components/managementPet";
import { Validation } from "@/models";

type Props = {
  state: any;
  noName: boolean;
  optAcion: number;
  optSize: number;
  toast: boolean;
  toastConfig: Validation | undefined;
  imageSource: { uri: string };
  labelButton: string;
  scrollViewRef: React.RefObject<ScrollView | null>;
  setAcion: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setToast: (v: boolean) => void;
  changeValue: (value: any, field: string) => void;
  changeNoName: () => void;
  handleFocus: () => void;
  goToImage: () => void;
  savePet: () => void;
};

export function DataForm({
  state,
  noName,
  optAcion,
  optSize,
  toast,
  toastConfig,
  imageSource,
  labelButton,
  scrollViewRef,
  setAcion,
  setSize,
  setToast,
  changeValue,
  changeNoName,
  handleFocus,
  goToImage,
  savePet,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToImage}>
        <Image source={imageSource} style={styles.image} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}>
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: scale(40) }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <InputName
              name={state.statePet.pet.name}
              noName={noName}
              changeName={changeValue}
              changeNoName={changeNoName}
            />
          </View>
          <View style={styles.containerCenter}>
            <InputAction
              option={optAcion}
              changeValue={setAcion}
              changeOption={changeValue}
            />
          </View>
          <View style={[styles.row, { gap: scale(50) }]}>
            <InputType
              type={state.statePet.pet.type}
              changeValue={changeValue}
            />
            <InputSex sex={state.statePet.pet.sex} changeValue={changeValue} />
          </View>
          <View style={[styles.row, { gap: scale(5) }]}>
            <InputAge
              title="Edad"
              age={
                state.statePet.pet.age !== 0
                  ? state.statePet.pet.age?.toString()
                  : ""
              }
              type={state.statePet.pet.ageType}
              changeAge={changeValue}
              changeAgeType={changeValue}
            />
            <InputSize
              option={optSize}
              changeValue={setSize}
              changeOption={changeValue}
            />
          </View>
          <View style={{ marginTop: scale(16), width: "100%" }}>
            <InputDescription
              optAcion={optAcion}
              description={state.statePet.pet.description}
              changeValue={changeValue}
              onFocus={handleFocus}
            />
          </View>
          <View style={styles.submit}>
            <Button label={labelButton} onPress={savePet} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {toast && toastConfig && (
        <Toast validation={toastConfig} setToast={setToast} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    alignItems: "center",
    marginTop: scale(16),
  },
  row: {
    flexDirection: "row",
    marginTop: scale(16),
    justifyContent: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  submit: {
    marginTop: scale(10),
    marginBottom: scale(16),
    alignItems: "center",
  },
  image: {
    width: scale(90),
    height: scale(90),
    borderRadius: 900,
    marginTop: scale(10),
  },
});
