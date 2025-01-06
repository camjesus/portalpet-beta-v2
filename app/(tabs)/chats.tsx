import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Button from "@/components/ui/Button";
import TextInputCustom from "@/components/ui/TextInputCustom";
import PanelButtons from "@/components/PanelButtons";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { useState } from "react";
import { Link } from "expo-router";
import CheckBox from "@/components/ui/CheckBox";

export default function TabThreeScreen() {
  const [pruebaText, onChangePrue] = useState("");
  const [opt, setOption] = useState(0);
  const [acction, setAction] = useState("ADOPTION");
  const [active, setActive] = useState(false);

  const [sexFamale, setSexFamale] = useState(true);
  const [sexMale, setSexMale] = useState(false);

  const actions = ["ADOPTION"];
  const labelsPanel = ["En adopción", "Lo busco", "Lo encontré"];

  console.log(pruebaText);

  function chageAccion(opt: number) {
    console.log(opt + " chagevalue");

    switch (opt) {
      case 0:
        setAction("ADOPTION");
        break;
      case 1:
        setAction("WANTED");
        break;
      case 2:
        setAction("FOUND");
        break;
    }
  }

  function pressWacho() {
    console.log("se apreti");
  }

  function changeSex() {
    console.log("macho" + sexMale + " / hembra" + sexFamale);
    setSexFamale(!sexFamale);
    setSexMale(!sexMale);
  }

  return (
    <ParallaxScrollView>
      <HeaderCustom
        title="Portal Pet"
        childrenRight={
          <Link href={"/managementPet/abmPet"}>
            <IconSymbol size={30} name="paw" color="white" />
          </Link>
        }
        childrenLeft={<IconSymbol size={25} name="paw" color="white" />}
        onPressRight={pressWacho}
      ></HeaderCustom>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Chats</ThemedText>
      </ThemedView>
      <PanelButtons
        changeOption={(t) => chageAccion(t)}
        option={opt}
        labels={labelsPanel}
      />
      <TextInputCustom
        options={{
          value: pruebaText,
          onChangeText: (t) => onChangePrue(t),
          placeholder: "Nombre",
        }}
      />
      <Button label="Crear" onPress={() => pressWacho()}>
        ƒ
        <IconSymbol size={20} name="paw" color="white" />
      </Button>
      <CheckBox label="No tiene" active={active} onPress={setActive} />

      <View style={styles.row}>
        <CheckBox active={sexFamale} onPress={changeSex}>
          <IconSymbol size={25} name="paw" color="black" />
        </CheckBox>
        <View style={{ marginHorizontal: 10 }}>
          <CheckBox active={sexMale} onPress={changeSex}>
            <IconSymbol size={25} name="paw" color="black" />
          </CheckBox>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    flexWrap: "wrap",
  },
});
