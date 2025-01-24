import { View, Text, StyleSheet } from "react-native";
import PanelButtons from "../../../components/ui/PanelButtons";
import TitleCustom from "@/components/ui/TitleCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LABEL_SIZE, SIZE } from "@/constants/StaticData";
import React from "react";
import { scale } from "react-native-size-matters";

type Props = {
  option: number;
  changeValue: React.Dispatch<React.SetStateAction<number>>;
  changeOption: (opt: string, field: string) => void;
};

export default function InputSize({
  option,
  changeOption,
  changeValue,
}: Props) {
  function changeSize(opt: number) {
    changeValue(opt);
    return SIZE[opt];
  }
  return (
    <>
      <TitleCustom title="Tamaño">
        <View>
          <PanelButtons
            changeOption={(t) => changeOption(changeSize(t), "size")}
            option={option}
            children={[
              <IconSymbol
                key={"opt0"}
                size={20}
                name="paw"
                color={option === 0 ? "#4B4B4B" : "#A5A5A5"}
              />,
              <IconSymbol
                key={"opt1"}
                size={23}
                name="paw"
                color={option === 1 ? "#4B4B4B" : "#A5A5A5"}
              />,
              <IconSymbol
                key={"opt2"}
                size={26}
                name="paw"
                color={option === 2 ? "#4B4B4B" : "#A5A5A5"}
              />,
            ]}
          />
          <Text style={styles.text}>{LABEL_SIZE[option]}</Text>
        </View>
      </TitleCustom>
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
