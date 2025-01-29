import { Pressable, View, Text, StyleSheet } from "react-native";
import TextInputCustom from "@/components/ui/TextInputCustom";
import TitleCustom from "@/components/ui/TitleCustom";
import React from "react";
import { scale } from "react-native-size-matters";
import { Age } from "@/models/Enums";

type Props = {
  age: string;
  type: string;
  changeAge: (text: string, field: string) => void;
  changeAgeType: (text: string, field: string) => void;
};

export default function InputAge({
  age,
  type,
  changeAge,
  changeAgeType,
}: Props) {
  return (
    <>
      <TitleCustom title="Edad">
        <View style={{ width: scale(70), marginHorizontal: "auto" }}>
          <TextInputCustom
            options={{
              value: age,
              onChangeText: (t) => changeAge(t, "age"),
              placeholder: "Edad",
              keyboardType: "numeric",
            }}
          />
        </View>
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
              onPress={() => changeAgeType(Age.YEAR, "ageType")}
            >
              <Text
                style={type === Age.YEAR ? styles.labelActive : styles.label}
              >
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
              onPress={() => changeAgeType(Age.MONTH, "ageType")}
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
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: scale(10),
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
    paddingHorizontal: scale(4),
    paddingVertical: scale(2),
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
});
