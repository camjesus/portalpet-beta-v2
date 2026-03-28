import { useState, useReducer, useEffect, useRef } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { ScrollView } from "react-native";
import { petReducer, ACTION } from "@/hooks/reducers/usePet";
import { validatePet, savePetAsync } from "@/features/pet/services/petService";
import { Validation } from "@/models";
import { ACCTIONS, SIZE } from "@/constants/StaticData";

export function useLoadData() {
  const { stringItem, image } = useLocalSearchParams<{
    stringItem: string;
    image: string;
  }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const [noName, setNoName] = useState(
    state.statePet.id ? state.statePet.pet.name === "" : false,
  );
  const [optAcion, setAcion] = useState(0);
  const [optSize, setSize] = useState(0);
  const [load, setLoad] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation>();
  const imageSource = image ? { uri: image } : { uri: state.statePet.pet.image };
  const labelButton = state.statePet.id ? "Editar" : "Crear";
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    setAcion(ACCTIONS.findIndex((p) => state.statePet.pet.action === p));
    setSize(SIZE.findIndex((p) => state.statePet.pet.size === p));
  }, [state.statePet]);

  function changeValue(value: any, field: string) {
    dispatch({ type: ACTION.CHANGE_INPUT, payload: { field, value } });
  }

  async function savePet() {
    var result = validatePet(state.statePet.pet, noName);
    setToastConfig(result);
    setToast(true);

    if (result.sucess) {
      setTimeout(async () => {
        setToast(false);
        setLoad(true);
        await savePetAsync(state.statePet.id, state.statePet.pet);
        router.push({ pathname: "/(tabs)/myPets", params: { search: "yes" } });
        setLoad(false);
      }, 1500);
    }
  }

  function changeNoName() {
    setNoName(!noName);
    if (!noName) changeValue("", "name");
  }

  const handleFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  function goToImage() {
    router.push({
      pathname: "/managementPet/loadImage",
      params: { stringItem: JSON.stringify(state) },
    });
  }

  return {
    state,
    noName,
    optAcion,
    optSize,
    load,
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
  };
}
