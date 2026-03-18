import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { scale } from "react-native-size-matters";
import { TitleCustom } from "@/components/ui";

type Props = {
  radius: number;
  changeValue: (value: any, field: string) => void;
};

export default function FilterRadius({ radius, changeValue }: Props) {
  return (
    <TitleCustom title="Distancia">
      <View style={styles.container}>
        <Text style={styles.value}>{radius} km</Text>
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
    </TitleCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(280),
    paddingHorizontal: scale(8),
    paddingBottom: scale(5),
  },
  value: {
    textAlign: "center",
    paddingHorizontal: scale(10),
    paddingVertical: scale(2),
    backgroundColor: "#ffb13d",
    marginHorizontal: "auto",
    marginTop: scale(7),
    borderRadius: 2,
    color: "white",
    fontWeight: "bold",
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
