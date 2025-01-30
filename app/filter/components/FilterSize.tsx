import { View, Text, StyleSheet, Pressable } from "react-native";
import PanelButtons from "../../../components/ui/PanelButtons";
import TitleCustom from "@/components/ui/TitleCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LABEL_SIZE, SIZE } from "@/constants/StaticData";
import { Size } from "@/models/Enums";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import { loadLabels } from "@/hooks/useLoadPet";

type Props = {
  size: string[];
  changeValue: (opt: any, field: string) => void;
};

export default function FilterSize({ size, changeValue }: Props) {
  const opt0 = size.indexOf(Size.SMALL) > -1;
  const opt1 = size.indexOf(Size.MEDIUM) > -1;
  const opt2 = size.indexOf(Size.BIG) > -1;
  const [labels, setLabel] = useState(loadLabels(size));

  function changeSize(opt: number) {
    var exist = size.indexOf(SIZE[opt]) > -1;
    if (exist && size.length > 1) {
      size = size.filter((s) => s !== SIZE[opt]);
      setLabel(labels.filter((s) => s !== LABEL_SIZE[opt]));
    } else if (!exist) {
      size.push(SIZE[opt]);
    }
    setLabel(loadLabels(size));
    changeValue(size, "size");
  }

  return (
    <TitleCustom title="Tamaño">
      <View style={[styles.containerButton]}>
        <View style={styles.box}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#DCAD5F" : "white",
              },
              styles.button,
              opt0 ? styles.active : styles.desactive,
            ]}
            onPress={() => changeSize(0)}
          >
            <IconSymbol
              key={"opt0"}
              size={20}
              name="paw"
              color={opt0 ? "#4B4B4B" : "#A5A5A5"}
            />
          </Pressable>
        </View>
        <View style={styles.box}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#DCAD5F" : "white",
              },
              styles.button,
              opt1 ? styles.active : styles.desactive,
            ]}
            onPress={() => changeSize(1)}
          >
            <IconSymbol
              key={"opt1"}
              size={23}
              name="paw"
              color={opt1 ? "#4B4B4B" : "#A5A5A5"}
            />
          </Pressable>
        </View>
        <View style={styles.box}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#DCAD5F" : "white",
              },
              styles.button,
              opt2 ? styles.active : styles.desactive,
            ]}
            onPress={() => changeSize(2)}
          >
            <IconSymbol
              key={"opt2"}
              size={26}
              name="paw"
              color={opt2 ? "#4B4B4B" : "#A5A5A5"}
            />
          </Pressable>
        </View>
      </View>
      <View style={{ height: scale(40), width: scale(200) }}>
        {labels && <Text style={styles.text}>{labels.join(" -")}</Text>}
      </View>
    </TitleCustom>
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
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    //borderWidth: 2,
    borderColor: "#ffb13d",
    borderRadius: 5,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    height: scale(45),
    width: scale(45),
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#ffb13d",
  },
  desactive: {
    backgroundColor: "white",
  },
  label: {
    marginHorizontal: scale(5),
    textAlign: "center",
    color: "#A5A5A5",
    fontWeight: "bold",
  },
  activeLabel: {
    color: "#4B4B4B",
  },
  box: {
    borderColor: "#ffb13d",
    borderWidth: 2,
  },
});
