import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { CheckBox, Button } from "@/components/ui";

type Props = {
  goodWithKids: boolean; setGoodWithKids: React.Dispatch<React.SetStateAction<boolean>>;
  goodWithDogs: boolean; setGoodWithDogs: React.Dispatch<React.SetStateAction<boolean>>;
  goodWithCats: boolean; setGoodWithCats: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void;
};

export function CharacteristicsForm({
  goodWithKids, setGoodWithKids,
  goodWithDogs, setGoodWithDogs,
  goodWithCats, setGoodWithCats,
  onSave,
}: Props) {
  return (
    <View style={styles.container}>

<View style={styles.box}>
      <Text style={styles.sectionTitle}>Convivencia</Text>

      <View style={styles.rows}>
        <CheckBox label="Convive bien con niños" active={goodWithKids} onPress={setGoodWithKids} />
        <CheckBox label="Convive bien con perros" active={goodWithDogs} onPress={setGoodWithDogs} />
        <CheckBox label="Convive bien con gatos" active={goodWithCats} onPress={setGoodWithCats} />
      </View>
</View>
      <View style={styles.button}>
        <Button label="Publicar" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#ffb13d",
    borderRadius: 10,
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    gap: scale(10),
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: scale(14),
    color: "#151718",
    marginTop: scale(8),
  },
  rows: {
    gap: scale(16),
  },
  button: {
    alignItems: "center",
    marginTop: scale(32),
  },
});
