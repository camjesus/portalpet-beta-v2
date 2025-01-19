import { View, Text, StyleSheet } from "react-native";
import PanelButtons from "./PanelButtons";
import TitleCustom from "@/components/ui/TitleCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LABEL_SIZE } from "@/constants/StaticData";
import React from "react";

type Props = {
  option: number;
  chageOption: (opt: string, field: string) => void;
};

export default function InputSize({ option, chageOption }: Props) {
  return (
    <>
      <TitleCustom title="Tamaño">
        <View>
          <PanelButtons
            changeOption={(t) => chageOption(t.toString(), "size")}
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
                size={24}
                name="paw"
                color={option === 1 ? "#4B4B4B" : "#A5A5A5"}
              />,
              <IconSymbol
                key={"opt2"}
                size={28}
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
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#ffb13d",
    marginHorizontal: "auto",
    marginTop: 5,
    borderRadius: 2,
    color: "white",
  },
});
