import React, { useState, useReducer, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { scale } from "react-native-size-matters";
import { petReducer, ACTION } from "@/hooks/reducers/usePet";
//components
import {
  IconSymbol,
  HeaderCustom,
  Button,
  Toast,
  ViewCustom,
  Loading,
  InputAge,
} from "@/components/ui";
import {
  InputName,
  InputSize,
  InputType,
  InputSex,
  InputAction,
  InputDescription,
} from "@/components/managementPet";
import { validatePet, savePetAsync } from "@/service/pet/petActions";
import { Validation } from "@/models";
import { ACCTIONS, SIZE } from "@/constants/StaticData";

export default function LoadData() {
  const { stringItem, image } = useLocalSearchParams<{
    stringItem: string;
    image: string;
  }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const [noName, setNoName] = useState(state.statePet.pet.name === "");
  const [optAcion, setAcion] = useState(0);
  const [optSize, setSize] = useState(0);
  const [load, setLoad] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation>();
  const imageSource = image
    ? { uri: image }
    : { uri: state.statePet.pet.image };
  const labelButton = state.statePet.id ? "Editar" : "Crear";
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setAcion(ACCTIONS.findIndex((p) => state.statePet.pet.action === p));
    setSize(SIZE.findIndex((p) => state.statePet.pet.size === p));
  }, [state.statePet]);

  function changeValue(value: any, field: string) {
    dispatch({
      type: ACTION.CHANGE_INPUT,
      payload: {
        field: field,
        value: value,
      },
    });
    console.log("state" + JSON.stringify(state));
  }
  console.log("state data", state);

  async function savePet() {
    var result = validatePet(state.statePet.pet, noName);

    setToastConfig(result);
    setToast(true);
    console.log("petObj", state.statePet.pet);

    if (result.sucess) {
      await savePetAsync(state.statePet.id, state.statePet.pet);
      router.push({ pathname: "/(tabs)/myPets", params: { search: "yes" } });
      setLoad(false);
    }
  }

  function changeNoName() {
    setNoName(!noName);
    if (!noName) changeValue("", "name");
  }

  function submit() {
    savePet();
  }

  const handleFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <ViewCustom>
      <HeaderCustom
        title="Nueva mascota"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {load && <Loading />}
      {!load && (
        <View style={styles.container}>
          <View>
            <Image source={imageSource} style={[styles.image]} />
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}>
            <ScrollView
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: scale(40),
              }}
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
                <InputSex
                  sex={state.statePet.pet.sex}
                  changeValue={changeValue}
                />
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
              <View style={{ marginTop: scale(16) }}>
                <InputDescription
                  optAcion={optAcion}
                  description={state.statePet.pet.description}
                  changeValue={changeValue}
                  onFocus={handleFocus}
                />
              </View>

              <View style={styles.submit}>
                <Button label={labelButton} onPress={submit} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          {toast && toastConfig && (
            <Toast validation={toastConfig} setToast={setToast} />
          )}
        </View>
      )}
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    alignItems: "center",
    marginTop: scale(16),
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginTop: scale(16),
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  submit: {
    marginBottom: scale(16),
  },
  image: {
    width: scale(90),
    height: scale(90),
    borderRadius: 900,
    marginTop: scale(10),
  },
});
