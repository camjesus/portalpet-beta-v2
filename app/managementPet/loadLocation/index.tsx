import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  HeaderCustom,
  IconSymbol,
  Loading,
  ViewCustom,
} from "@/components/ui";
import { Link, router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import MapView, { Marker } from "react-native-maps";
import { ACTION, petReducer } from "@/hooks/reducers/usePet";
import { useLocation } from "@/hooks/useLocation";
import { autocompleteAddress, reverseGeocode } from "@/services/utils/location";

export default function LoadLocationLayout() {
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

  const saveCoords = () => {
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
  };

  async function handleAddressChange(text: string) {
    setAddress(text);
    const results = await autocompleteAddress(text);
    setSuggestions(results);
  }

  return (
    <ViewCustom>
      <HeaderCustom
        title="Ubicación"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {!coords && <Loading />}

      {coords && (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={handleAddressChange}
                placeholder="Buscar dirección..."
                onSubmitEditing={() => {
                  search(address);
                  setSuggestions([]);
                }}
                selectTextOnFocus
              />
              <Button
                label="Buscar"
                onPress={() => {
                  search(address);
                  setSuggestions([]);
                }}
              />
              {suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item, index) => `${item.place_id}-${index}`}
                  style={styles.suggestions}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => {
                        setAddress(item.display_name);
                        setCoords({
                          lat: parseFloat(item.lat),
                          lng: parseFloat(item.lon),
                        });
                        setSuggestions([]);
                      }}>
                      <Text style={styles.suggestionText} numberOfLines={2}>
                        {item.display_name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </View>
          <Text style={styles.infoText}>
            Tu dirección queda privada 🔒 la usamos únicamente para mostrar
            resultados por cercanía.
          </Text>
          <MapView
            provider="google"
            style={styles.map}
            region={{
              latitude: coords.lat,
              longitude: coords.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setCoords({ lat: latitude, lng: longitude });
            }}>
            <Marker
              coordinate={{ latitude: coords.lat, longitude: coords.lng }}
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setCoords({ lat: latitude, lng: longitude });
              }}
            />
          </MapView>

          <Button label={"Confirmar ubicación"} onPress={saveCoords} />
        </View>
      )}
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    textDecorationColor: "black",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  map: {
    width: "100%",
    height: scale(450),
    overflow: "hidden",
  },
  label: {
    backgroundColor: "white",
  },
  infoText: {
    backgroundColor: "white",
    color: "black",
    fontSize: scale(12),
    marginHorizontal: scale(2),
    marginVertical: scale(5),
    padding: scale(10),
    borderRadius: 10,
    borderColor: "#ffb13d",
    borderWidth: 5,
    textAlign: "center",
  },
  searchContainer: {
    zIndex: 10,
  },
  suggestions: {
    position: "absolute",
    top: scale(42),
    left: 0,
    right: scale(80),
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 20,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionText: {
    fontSize: scale(12),
    color: "#333",
  },
});
