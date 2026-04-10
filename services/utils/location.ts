import * as Location from "expo-location";
import { Alert } from "react-native";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const HEADERS = {
  "Accept-Language": "es",
  "User-Agent": "PortalPet/1.0 (com.camjesus.portalpetbetav2)",
};

export async function getCurrentLocation() {
  const FALLBACK = { lat: -34.6037, lng: -58.3816 };

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permiso denegado", "Usando ubicación predeterminada.");
    return FALLBACK;
  }

  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) {
    Alert.alert(
      "Servicios de ubicación desactivados",
      "Usando ubicación predeterminada."
    );
    return FALLBACK;
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
    return FALLBACK;
  }
}

export async function reverseGeocode(lat: number, lng: number) {
  try {
    const response = await fetch(
      `${NOMINATIM_URL}/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: HEADERS }
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
      `${NOMINATIM_URL}/search?q=${encodeURIComponent(address)}&countrycodes=ar&limit=1&format=json`,
      { headers: HEADERS }
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

export async function autocompleteAddress(text: string) {
  if (text.length < 3) return [];
  try {
    const response = await fetch(
      `${NOMINATIM_URL}/search?q=${encodeURIComponent(text)}&countrycodes=ar&limit=5&format=json`,
      { headers: HEADERS }
    );
    const data = await response.json();
    return data || [];
  } catch {
    return [];
  }
}