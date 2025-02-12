import { StyleSheet } from "react-native";
import PanelButtons from "@/components/ui/PanelButtons";
import { ACCTIONS, LABELS_ACCTION } from "@/constants/StaticData";
import React from "react";
import { scale } from "react-native-size-matters";

type Props = {
  option: number;
  changeValue: React.Dispatch<React.SetStateAction<number>>;
  changeOption: (opt: string, field: string) => void;
};

export default function InputAction({
  option,
  changeOption,
  changeValue,
}: Props) {
  function changeAction(opt: number) {
    changeValue(opt);
    return ACCTIONS[opt];
  }
  return (
    <>
      <PanelButtons
        changeOption={(t) => changeOption(changeAction(t), "action")}
        option={option}
        labels={LABELS_ACCTION}
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
