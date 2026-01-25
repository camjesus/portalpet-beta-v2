import { Pressable, View, Text, StyleSheet } from "react-native";
import { TextInputCustom, TitleCustom } from "@/components/ui";
import React from "react";
import { scale } from "react-native-size-matters";
import { AgeType } from "@/models";

type Props = {
  title: string;
  age: string;
  type: string;
  changeAge: (text: any, field: string) => void;
  changeAgeType: (text: any, field: string) => void;
};

export default function InputAge({
  title,
  age,
  type,
  changeAge,
  changeAgeType,
}: Props) {
  function valideteAge(value: string) {
    type === AgeType.MONTH && parseInt(value) > 12
      ? age
      : changeAge(value ? parseInt(value) : "", "age");
  }

  function valideteAgeType(value: string) {
    if (value === AgeType.MONTH && age !== "" && parseInt(age) > 12) {
      changeAge("12", "age");
      changeAgeType(value, "ageType");
      return;
    }
    changeAgeType(value, "ageType");
  }

  return (
    <>
      <TitleCustom title={title}>
        <View style={styles.container}>
          <View style={styles.input}>
            <TextInputCustom
              options={{
                value: age,
                onChangeText: (t) => valideteAge(t),
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
                  type === AgeType.YEAR ? styles.active : styles.default,
                ]}
                onPress={() => valideteAgeType(AgeType.YEAR)}>
                <Text
                  style={
                    type === AgeType.YEAR ? styles.labelActive : styles.label
                  }>
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
                  type === AgeType.MONTH ? styles.active : styles.default,
                ]}
                onPress={() => valideteAgeType(AgeType.MONTH)}>
                <Text
                  style={
                    type === AgeType.MONTH ? styles.labelActive : styles.label
                  }>
                  Meses
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TitleCustom>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: scale(10),
  },
  row: {
    flexDirection: "row",
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
  input: {
    width: scale(70),
    height: scale(40),
  },
});
