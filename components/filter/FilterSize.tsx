import { View, Text, StyleSheet, Pressable } from "react-native";
import { TitleCustom, IconSymbol } from "@/components/ui";
import { LABEL_SIZE, SIZE } from "@/constants/StaticData";
import { Size } from "@/models";
import React from "react";
import { scale } from "react-native-size-matters";
import { loadLabels } from "@/services/utils/usePet";

type Props = {
  size: string[];
  changeValue: (opt: any, field: string) => void;
};

const SIZES = [
  { key: Size.SMALL, iconSize: 20 },
  { key: Size.MEDIUM, iconSize: 23 },
  { key: Size.BIG, iconSize: 26 },
];

export default function FilterSize({ size, changeValue }: Props) {
  const labels = loadLabels(size);

  function changeSize(opt: number) {
    let newSize = [...size];
    const isSelected = newSize.includes(SIZE[opt]);

    if (isSelected && newSize.length > 1) {
      newSize = newSize.filter((s) => s !== SIZE[opt]);
    } else if (!isSelected) {
      newSize.push(SIZE[opt]);
    }

    changeValue(newSize, "size");
  }

  return (
    <TitleCustom title="Tamaño">
      <View style={styles.containerButton}>
        {SIZES.map((s, index) => {
          const isActive = size.includes(s.key);
          return (
            <View key={s.key} style={styles.box}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  isActive ? styles.active : styles.desactive,
                  pressed && { backgroundColor: "#DCAD5F" },
                ]}
                onPress={() => changeSize(index)}>
                <IconSymbol
                  size={s.iconSize}
                  name="paw"
                  color={isActive ? "#4B4B4B" : "#A5A5A5"}
                />
              </Pressable>
            </View>
          );
        })}
      </View>
      <View style={{ height: scale(40), width: scale(200) }}>
        {labels.length > 0 && (
          <Text style={[styles.text, labels.length === 0 && styles.textEmpty]}>
            {labels.length > 0 ? labels.join(" - ") : "Seleccioná un tamaño"}
          </Text>
        )}
      </View>
    </TitleCustom>
  );
}

const styles = StyleSheet.create({
  textEmpty: {
    backgroundColor: "transparent",
    color: "#A5A5A5",
  },
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
  box: {
    borderColor: "#ffb13d",
    borderWidth: 2,
  },
});
