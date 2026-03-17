import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { scale } from "react-native-size-matters";

type Props = {
  radius: number;
  changeValue: (value: any, field: string) => void;
};

export default function FilterRadius({ radius, changeValue }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Distancia máxima: <Text style={styles.value}>{radius} km</Text>
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={100}
        step={1}
        value={radius}
        onValueChange={(v) => changeValue(v, "radiusKm")}
        minimumTrackTintColor="#ffb13d"
        maximumTrackTintColor="#A5A5A5"
        thumbTintColor="#ffb13d"
      />
      <View style={styles.row}>
        <Text style={styles.hint}>1 km</Text>
        <Text style={styles.hint}>100 km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: scale(12),
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(13),
    marginBottom: scale(4),
  },
  value: {
    color: "#ffb13d",
  },
  slider: {
    width: "100%",
    height: scale(40),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(-6),
  },
  hint: {
    color: "#A5A5A5",
    fontSize: scale(11),
  },
});
