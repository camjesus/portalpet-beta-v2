import React, { useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
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

export default function LoadLocationLayout() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);

  const { coords, setCoords, address, setAddress, search, loading } =
    useLocation();

  function changeValue(value: any, field: string) {
    dispatch({ type: ACTION.CHANGE_INPUT, payload: { field, value } });
  }

  const saveCoords = () => {
    if (!coords) return;
    changeValue(coords.lat.toString(), "latitude");
    changeValue(coords.lng.toString(), "longitude");
    router.push({
      pathname: "/managementPet/loadData",
      params: { stringItem: JSON.stringify(state) },
    });
  };
  function next() {
    router.push({
      pathname: "/managementPet/loadData",
      params: { stringItem: JSON.stringify(state) },
    });
    console.log(JSON.stringify(state));
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
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Buscar dirección..."
              onSubmitEditing={() => search(address)}
            />
            <Button label="Buscar" onPress={() => search(address)} />
          </View>
          <Text style={styles.infoText}>
            Tu dirección queda privada 🔒 la usamos únicamente para mostrar
            resultados por cercanía.
          </Text>
          <MapView
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
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  map: {
    flex: 1,
    height: scale(400),
    borderRadius: 15,
    backgroundColor: "white",
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
  },
});
