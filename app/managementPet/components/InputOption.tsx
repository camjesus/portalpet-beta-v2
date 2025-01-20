import { View, StyleSheet } from "react-native";
import TitleCustom from "@/components/ui/TitleCustom";
import CheckBox from "@/components/ui/CheckBox";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { scale } from "react-native-size-matters";

type Props = {
  title: string;
  optOne: boolean;
  optTwo: boolean;
  changeOption: (text: string) => void;
  icon: React.ReactNode[];
};

export default function InputOption({
  title,
  optOne,
  optTwo,
  changeOption,
  icon,
}: Props) {
  return (
    <>
      <TitleCustom title={title}>
        <View style={[styles.row, { gap: scale(10) }]}>
          <CheckBox active={optOne} onPress={() => changeOption("optOne")}>
            {icon[0]}
          </CheckBox>
          <View>
            <CheckBox active={optTwo} onPress={() => changeOption("optTwo")}>
              {icon[1]}
            </CheckBox>
          </View>
        </View>
      </TitleCustom>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
  },
});
