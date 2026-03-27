import { useEffect, useReducer, useState } from "react";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { BackHandler } from "react-native";
import { findPets } from "@/features/pet/services/petService";
import { saveActionFilterAsync } from "@/services/storage/filterStorage";
import { filterReducer, initialFilter, ACTION } from "@/hooks/reducers/useFilter";
import { PetId } from "@/models";

export function useHome() {
  const [myPets, setMyPets] = useState<PetId[]>([]);
  const [load, setLoad] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, initialFilter);
  const [optAction, setAction] = useState(0);

  const { search } = useLocalSearchParams<{ search: string }>();
  const [goToSearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false,
  );

  const navigation = useNavigation();

  // Bloquear back
  useEffect(() => {
    navigation.setOptions({ gestureEnabled: false, headerBackVisible: false });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    return () => navigation.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  // Cargar datos
  useEffect(() => {
    getData();
  }, [goToSearch]);

  const getData = async () => {
    setLoad(true);
    const res = await findPets();
    setMyPets(res.myPets);
    setAction(res.action);
    setSearch(false);
    dispatch({ type: ACTION.CHANGE_OBJECT, payload: { field: "filter", value: res.filter } });
    setLoad(false);
  };

  const changeValue = async (value: number) => {
    setAction(value);
    await saveActionFilterAsync(value);
    getData();
  };

  const goToFilter = () => {
    router.push({
      pathname: "/filter",
      params: { stateFilter: JSON.stringify(state) },
    });
  };

  return { myPets, load, optAction, goToFilter, changeValue };
}