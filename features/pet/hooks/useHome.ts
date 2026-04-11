import { useEffect, useMemo, useReducer, useState } from "react";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { BackHandler } from "react-native";
import { findPets } from "@/features/pet/services/petService";
import { saveActionFilterAsync } from "@/services/storage/filterStorage";
import { filterReducer, initialFilter, ACTION } from "@/hooks/reducers/useFilter";
import { PetId, PetWithDistance } from "@/models";
import { getCurrentLocation } from "@/services/utils/location";
import { getFilters } from "@/features/filter/services/filterStorageService";
import { haversineKm } from "@/services/utils/geo";

export function useHome() {
  type SortType = "recent" | "nearby";
  const [myPets, setMyPets] = useState<PetWithDistance[]>([]);
  const [load, setLoad] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, initialFilter);
  const [optAction, setAction] = useState(0);
  const { search } = useLocalSearchParams<{ search: string }>();
  const [goToSearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false,
  );
  const [sort, setSort] = useState<SortType>("recent");
  const [showSortModal, setShowSortModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const navigation = useNavigation();

  // Block back
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

  // Load data
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

const sortedPets = useMemo(() => {

  if (sort === "recent") {
      return [...myPets].sort((a, b) =>
    new Date(b.pet.createDate).getTime() - new Date(a.pet.createDate).getTime()
  );
  }

  if (sort === "nearby") {
    return myPets.sort((a, b) => {
      if (a.distanceKm === undefined) return 1;
      if (b.distanceKm === undefined) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }

  return myPets;
}, [sort, myPets, userLocation]);

return { sortedPets, sort, setSort, showSortModal, setShowSortModal, myPets, load, optAction, goToFilter, changeValue };
}
