import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import { Button, TextInfo, TextInputCustom } from "@/components/ui";
import MapView, { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";
import { Coords } from "@/models";

type Props = {
  coords: Coords;
  address: string;
  suggestions: any[];
  search: (address: string) => void;
  setCoords: (coords: Coords) => void;
  setAddress: (address: string) => void;
  setSuggestions: (suggestions: any[]) => void;
  handleAddressChange: (text: string) => void;
  saveCoords: () => void;
};

export function LocationForm({
  coords,
  address,
  suggestions,
  search,
  setCoords,
  setAddress,
  setSuggestions,
  handleAddressChange,
  saveCoords,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.row}>
          <TextInputCustom
            options={{
              maxLength: 200,
              value: address,
              selectTextOnFocus: true,
              onChangeText: handleAddressChange,
              placeholder: "Buscar dirección...",
              onSubmitEditing: () => {
                search(address);
                setSuggestions([]);
              },
            }}
          />
          <View style={styles.buttonContainer}>
          <Button
            label="Buscar"
            onPress={() => {
              search(address);
              setSuggestions([]);
            }}
          />
          </View>
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
        <TextInfo text="Tu dirección queda privada 🔒 la usamos únicamente para mostrar resultados por cercanía." />
      </View>

      <MapView
        provider={Platform.OS === 'android' ? 'google' : undefined}
        style={styles.map}
        region={{
          latitude: coords!.lat,
          longitude: coords!.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setCoords({ lat: latitude, lng: longitude });
        }}>
        <Marker
          coordinate={{ latitude: coords!.lat, longitude: coords!.lng }}
          draggable
          onDragEnd={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setCoords({ lat: latitude, lng: longitude });
          }}
        />
      </MapView>
      <View style={styles.submit}>
        <Button label="Confirmar ubicación" onPress={saveCoords} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submit:{
    margin: scale(10),
    },
  buttonContainer:{
    marginBottom: scale(10),
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(2),
    alignContent: "center",
    justifyContent: "center",
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
    height: scale(400),
    overflow: "hidden",
  },
  searchContainer: {
    zIndex: 10,
    padding: scale(10),
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
