import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import {
  Button,
  HeaderCustom,
  IconSymbol,
  Loading,
  ViewCustom,
} from "@/components/ui";
import { Link, router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import { API_KEY_LOCATIONIQ } from "@/secret-google";
import MapView, { Marker } from "react-native-maps";
import { ACTION, petReducer } from "@/hooks/reducers/usePet";

export default function LoadLocationLayout() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const { pet } = state.statePet;
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number }>();
  function changeValue(value: any, field: string) {
    dispatch({
      type: ACTION.CHANGE_INPUT,
      payload: {
        field: field,
        value: value,
      },
    });
  }
  // 📍 Obtener ubicación actual
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permiso denegado");
        setLoading(false);
        return;
      }
      console.log("status", JSON.stringify(status));

      try {
        const enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
          Alert.alert("Activa los servicios de ubicación del dispositivo");
          setLoading(false);
          return;
        }
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        console.log("location", JSON.stringify(location));

        const { latitude, longitude } = location.coords;
        console.log("latitude", JSON.stringify(latitude));
        console.log("longitude", JSON.stringify(longitude));

        setCoords({ lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
      } catch (error) {
        console.log("No se pudo obtener ubicación:", error);

        const fallback = {
          lat: -34.6037,
          lng: -58.3816,
        };

        setCoords(fallback);
        reverseGeocode(fallback.lat, fallback.lng);
      }
      setLoading(false);
    })();
  }, []);

  // 🔁 Reverse geocoding con OSM
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${API_KEY_LOCATIONIQ}&lat=${lat}&lon=${lng}&format=json`,
      );
      console.log(`x`);
      const data = await response.json();
      setAddress(data.display_name || "");
    } catch (error) {
      console.log(error);
    }
  };

  // 🔎 Buscar dirección
  const searchAddress = async () => {
    if (!address) return;

    Keyboard.dismiss();

    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search?key=${API_KEY_LOCATIONIQ}&q=${encodeURIComponent(
          address,
        )}&format=json`,
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        setCoords({ lat, lng });
        setAddress(data[0].display_name);
      } else {
        Alert.alert("Dirección no encontrada");
      }
    } catch (error) {
      Alert.alert("Error buscando dirección");
    }
  };

  function saveCoords() {
    if (!coords) return;
    changeValue(coords?.lat.toString(), "latitude");
    changeValue(coords?.lng.toString(), "longitude");
    console.log("state", JSON.stringify(state));
    next();
  }

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
      <View style={styles.label}>
        Tu dirección queda privada 🔒 la usamos únicamente para mostrar
        resultados por cercanía.
      </View>
      {!coords && <Loading />}

      {coords && (
        <View style={styles.container}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Buscar dirección..."
              onSubmitEditing={searchAddress}
            />
            <Button label={"Buscar"} onPress={searchAddress} />
          </View>

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
              reverseGeocode(latitude, longitude);
            }}>
            <Marker
              coordinate={{ latitude: coords.lat, longitude: coords.lng }}
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setCoords({ lat: latitude, lng: longitude });
                reverseGeocode(latitude, longitude);
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
});
