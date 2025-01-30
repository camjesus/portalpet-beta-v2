import { Pressable, View, Text, StyleSheet } from "react-native";
import TitleCustom from "@/components/ui/TitleCustom";
import React, { useCallback, useState } from "react";
import { scale } from "react-native-size-matters";
import { Age } from "@/models/Enums";
import Slider, { MarkerProps } from "@react-native-community/slider";
import { MAXIMUN_AGE } from "@/constants/StaticData";

type Props = {
  ageFrom: number;
  ageTo: number;
  type: string;
  changeValue: (text: any, field: string) => void;
};

export default function FilterAge({
  ageFrom,
  ageTo,
  type,
  changeValue,
}: Props) {
  const [maxValue, setMaxValue] = useState(
    type === Age.MONTH ? 11 : MAXIMUN_AGE
  );
  const [sliderFrom, setSliderFrom] = useState(ageFrom);
  const [sliderTo, setSliderTo] = useState(ageTo);

  const firstToValue = ageTo;

  function changeAgeType(ageType: string) {
    if (ageType === Age.MONTH) {
      setMaxValue(11);
      if (ageTo > 11) {
        changeValue(11, "ageTo");
        setSliderTo(11);
      }
      if (ageFrom > 11) {
        setSliderFrom(0);
        changeValue(0, "ageFrom");
      }
    } else {
      setMaxValue(MAXIMUN_AGE);
    }

    changeValue(ageType, "ageType");
  }

  return (
    <TitleCustom title="Edad">
      <View>
        <View style={styles.valueRow}>
          <View style={styles.labels}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Min:</Text>
            <Text style={{ color: "white" }}>{sliderFrom}</Text>
          </View>
          <View style={styles.labels}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Max:
            </Text>
            <Text style={{ color: "white" }}>{sliderTo}</Text>
          </View>
        </View>

        <Slider
          style={[styles.slider, { marginTop: scale(10) }]}
          minimumValue={1}
          maximumValue={maxValue}
          tapToSeek
          minimumTrackTintColor="#ffb13d"
          maximumTrackTintColor="#A5A5A5"
          thumbTintColor="#ffb13d"
          step={1}
          value={ageTo}
          onValueChange={(value) => {
            if (value > sliderFrom) {
              setSliderTo(value);
              changeValue(value, "ageTo");
            }
          }}
        />
      </View>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={maxValue}
        tapToSeek
        minimumTrackTintColor="#ffb13d"
        maximumTrackTintColor="#A5A5A5"
        thumbTintColor="#ffb13d"
        step={1}
        value={ageFrom}
        onValueChange={(value) => {
          if (value < sliderTo) {
            setSliderFrom(value);
            changeValue(value, "ageFrom");
          }
        }}
      />

      <View style={[styles.row, { gap: scale(10) }]}>
        <View style={styles.box}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#DCAD5F" : "#ffb13d",
              },
              styles.button,
              styles.year,
              type === Age.YEAR ? styles.active : styles.default,
            ]}
            onPress={() => changeAgeType(Age.YEAR)}
          >
            <Text style={type === Age.YEAR ? styles.labelActive : styles.label}>
              Años
            </Text>
          </Pressable>
        </View>
        <View style={styles.box}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#DCAD5F" : "#ffb13d",
              },
              styles.button,
              type === Age.MONTH ? styles.active : styles.default,
            ]}
            onPress={() => changeAgeType(Age.MONTH)}
          >
            <Text
              style={type === Age.MONTH ? styles.labelActive : styles.label}
            >
              Meses
            </Text>
          </Pressable>
        </View>
      </View>
    </TitleCustom>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: "100%",
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(60),
    marginTop: scale(10),
  },
  row: {
    flexDirection: "row",
    marginVertical: scale(10),
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    color: "#A5A5A5",
    fontSize: scale(17),
    fontWeight: "bold",
  },
  year: {
    paddingHorizontal: scale(10),
  },
  labelActive: {
    color: "#4B4B4B",
    fontSize: scale(17),
    fontWeight: "bold",
  },
  button: {
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 2,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  active: {
    backgroundColor: "#ffb13d",
  },
  default: {
    backgroundColor: "white",
  },
  box: {
    borderColor: "#ffb13d",
    borderWidth: 3,
    borderRadius: 5,
  },
  labels: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb13d",
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: 5,
  },
});
