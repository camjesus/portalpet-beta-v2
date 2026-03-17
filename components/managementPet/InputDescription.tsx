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
