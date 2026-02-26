import { StyleSheet } from "react-native";
import { PLACEHOLDER_DESCRIPTION } from "@/constants/StaticData";
import React from "react";
import { scale } from "react-native-size-matters";
import { TextInputCustom } from "@/components/ui";

type Props = {
  description: string;
  optAcion: number;
  changeValue: (opt: string, field: string) => void;
  onFocus?: () => void;
};

export default function InputDescription({
  description,
  optAcion,
  changeValue,
  onFocus,
}: Props) {
  function change(value: string) {
    changeValue(value, "description");
  }
  return (
    <>
      <TextInputCustom
        label={"Descripción (" + (200 - description.length) + ")"}
        options={{
          numberOfLines: 4,
          maxLength: 200,
          value: description,
          onChangeText: (t) => change(t),
          placeholder: PLACEHOLDER_DESCRIPTION[optAcion],
          onFocus: onFocus,
        }}
        multiline={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
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
});
