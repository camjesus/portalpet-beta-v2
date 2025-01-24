import { View, Text, StyleSheet } from "react-native";
import PanelButtons from "../../../components/ui/PanelButtons";
import TitleCustom from "@/components/ui/TitleCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  LABEL_SIZE,
  PLACEHOLDER_DESCRIPTION,
  SIZE,
} from "@/constants/StaticData";
import React from "react";
import { scale } from "react-native-size-matters";
import TextInputCustom from "@/components/ui/TextInputCustom";

type Props = {
  description: string;
  optAcion: number;
  changeValue: (opt: string, field: string) => void;
};

export default function InputDescription({
  description,
  optAcion,
  changeValue,
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
