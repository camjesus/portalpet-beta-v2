import { useEffect, useReducer, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ACTION, petReducer } from "@/hooks/reducers/usePet";
import { useLocation } from "@/hooks/useLocation";
import { autocompleteAddress, reverseGeocode } from "@/services/utils/location";

export function useLoadLocation() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const hasCoords = state.statePet.pet.latitude && state.statePet.pet.longitude;
  const initialCoords = hasCoords
    ? {
        lat: state.statePet.pet.latitude as number,
        lng: state.statePet.pet.longitude as number,
      }
    : null;

  const { coords, setCoords, address, setAddress, search, loading } =
    useLocation(initialCoords);

  function changeValue(value: any, field: string) {
    dispatch({ type: ACTION.CHANGE_INPUT, payload: { field, value } });
  }

  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.lat, coords.lng).then(setAddress);
  }, [coords]);

  function saveCoords() {
    if (!coords) return;
    changeValue(coords.lng, "longitude");
    changeValue(coords.lat, "latitude");

    router.push({
      pathname: "/managementPet/loadData",
      params: {
        stringItem: JSON.stringify({
          ...state,
          statePet: {
            ...state.statePet,
            pet: {
              ...state.statePet.pet,
              latitude: coords.lat,
              longitude: coords.lng,
            },
          },
        }),
      },
    });
  }

  async function handleAddressChange(text: string) {
    setAddress(text);
    const results = await autocompleteAddress(text);
    setSuggestions(results);
  }

  return {
    coords,
    setCoords,
    address,
    setAddress,
    suggestions,
    setSuggestions,
    loading,
    search,
    saveCoords,
    handleAddressChange,
  };
}
