import * as Location from "expo-location";
import { Alert } from "react-native";

const API_KEY_LOCATIONIQ = process.env.API_KEY_LOCATIONIQ!;

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permiso denegado");
    return null;
  }

  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) {
    Alert.alert("Activa los servicios de ubicación del dispositivo");
    return null;
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  } catch (error) {
    console.log("No se pudo obtener ubicación:", error);
    return { lat: -34.6037, lng: -58.3816 }; // fallback
  }
}

export async function reverseGeocode(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${API_KEY_LOCATIONIQ}&lat=${lat}&lon=${lng}&format=json`,
    );
    const data = await response.json();
    return data.display_name || "";
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function searchAddress(address: string) {
  if (!address) return null;

  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search?key=${API_KEY_LOCATIONIQ}&q=${encodeURIComponent(
        address,
      )}&format=json`,
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        address: data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.log("Error buscando dirección", error);
    return null;
  }
}
