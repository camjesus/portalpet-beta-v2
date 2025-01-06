import { Text, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import PanelButtons from "@/components/PanelButtons";
import { FC, useState } from "react";
import TextInputCustom from "@/components/ui/TextInputCustom";
import CheckBox from "@/components/ui/CheckBox";
import { LABELS_ACCTION, ACCTIONS } from "../Models/Constants";
import TitleCustom from "@/components/ui/TitleCustom";
import Button from "@/components/ui/Button";

export default function ManagementPet() {
  const [acction, setAction] = useState("ADOPTION");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [noName, setNoName] = useState(false);
  const [female, setFemale] = useState(true);
  const [male, setMale] = useState(false);
  const [dog, setDog] = useState(true);
  const [cat, setCat] = useState(false);
  const [opt, setOption] = useState(0);

  function changeSex() {
    console.log("macho" + male + " / hembra" + female);
    setFemale(!female);
    setMale(!male);
  }

  function changeName(text: string) {
    setName(text);
  }

  function changeAge(text: string) {
    setAge(text);
  }

  function changeType() {
    console.log("perro " + dog + " / cat " + cat);

    setDog(!dog);
    setCat(!cat);
  }

  function changeNoName() {
    setNoName(!noName);
    if (!noName) setName("");
  }

  function chageAccion(opt: number) {
    setOption(opt);
    setAction(ACCTIONS[opt]);
    console.log(opt + " chagevalue");
    console.log(acction + " accion");
  }

  return (
    <ParallaxScrollView>
      <HeaderCustom
        title="Nueva mascota"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      ></HeaderCustom>
      <View style={styles.containerAcction}>
        <PanelButtons
          changeOption={(t) => chageAccion(t)}
          option={opt}
          labels={LABELS_ACCTION}
        />
      </View>
      <View style={styles.row}>
        <View style={{ width: "65%" }}>
          <TextInputCustom
            options={{
              value: name,
              onChangeText: (t) => changeName(t),
              placeholder: noName ? "No tiene" : "Nombre",
            }}
            editable={!noName}
          />
        </View>

        <CheckBox label="No tiene" active={noName} onPress={changeNoName} />
      </View>

      <View style={[styles.row, { gap: 40 }]}>
        <TitleCustom title="Mascota">
          <View style={[styles.row, { gap: 10 }]}>
            <CheckBox active={dog} onPress={changeType}>
              <IconSymbol size={25} name="dog" color="black" />
            </CheckBox>
            <View>
              <CheckBox active={cat} onPress={changeType}>
                <IconSymbol size={25} name="cat" color="black" />
              </CheckBox>
            </View>
          </View>
        </TitleCustom>

        <TitleCustom title="Sexo">
          <View style={[styles.row, {gap: 10 }]}>
            <CheckBox active={female} onPress={changeSex}>
              <IconSymbol size={25} name="female" color="black" />
            </CheckBox>
            <View>
              <CheckBox active={male} onPress={changeSex}>
                <IconSymbol size={25} name="male" color="black" />
              </CheckBox>
            </View>
          </View>
        </TitleCustom>
      </View>

      <View style={[styles.row, { gap: 10 }]}>
        <View>
      <TitleCustom title="Edad">
      <View style={[{ paddingHorizontal: 10 }]}>
      
          <View style= {[styles.row, {gap: 3}]} >
            
          <Button label="Meses"></Button>
          <Button label="Años"></Button>
          </View>
          <TextInputCustom
            options={{
              value: age,
              onChangeText: (t) => changeAge(t),
              placeholder: "Edad",
              keyboardType: "numeric",
            }}
          />
        </View>
        </TitleCustom>
        </View>
        
        <View >
        <TitleCustom title="Tamaño">
          <View>
            <PanelButtons
              changeOption={(t) => chageAccion(t)}
              option={opt}
              children={[
                <IconSymbol key={"opt0"} size={20} name="paw" color="black" />,
                <IconSymbol key={"opt1"} size={25} name="paw" color="black" />,
                <IconSymbol key={"opt2"} size={29} name="paw" color="black" />,
              ]}
            />
          </View>
        </TitleCustom>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerAcction: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
  },
});
