import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import PanelButtons from "@/app/managementPet/components/PanelButtons";
import { useState, useReducer } from "react";
import TextInputCustom from "@/components/ui/TextInputCustom";
import {
  LABELS_ACCTION,
  ACCTIONS,
  PLACEHOLDER_DESCRIPTION,
  SIZE,
} from "@/constants/StaticData";
import InputName from "./components/InputName";
import InputOption from "./components/InputOption";
import InputSize from "./components/InputSize";
import InputAge from "./components/InputAge";
import Button from "@/components/ui/Button";
import { petReducer, initalPet, ACTION } from "@/hooks/usePetReducer";
import { ScrollView } from "react-native-gesture-handler";
import InputImage from "./components/InputImage";
import { savePetAsync } from "@/service/useDataBase";

export default function ManagementPet() {
  const [noName, setNoName] = useState(false);
  const [optAcion, setAcion] = useState(0);
  const [optSize, setSize] = useState(0);
  const [description, setDescription] = useState("");
  const [state, dispatch] = useReducer(petReducer, initalPet);

  console.log("state", state.pet);

  function changeValue(value: string, field: string) {
    console.log("value", value);
    console.log("field", field);

    switch (field) {
      case "sex":
        console.log("prueba", value === "optOne" ? "FEMALE" : "MALE");
        dispatch({
          type: ACTION.CHANGE_INPUT,
          payload: {
            field: field,
            value: value === "optOne" ? "FEMALE" : "MALE",
          },
        });
        break;
      case "type":
        dispatch({
          type: ACTION.CHANGE_INPUT,
          payload: {
            field: field,
            value: value === "optOne" ? "DOG" : "CAT",
          },
        });
        break;
      case "action":
        setAcion(parseInt(value));
        dispatch({
          type: ACTION.CHANGE_INPUT,
          payload: {
            field: field,
            value: ACCTIONS[parseInt(value)],
          },
        });
        break;
      case "size":
        setSize(parseInt(value));
        dispatch({
          type: ACTION.CHANGE_INPUT,
          payload: {
            field: field,
            value: SIZE[parseInt(value)],
          },
        });
        break;
      default:
        if (field === "description") setDescription(value);
        dispatch({
          type: ACTION.CHANGE_INPUT,
          payload: {
            field: field,
            value: value,
          },
        });
        break;
    }
  }

  async function savePet() {
    try {
      await savePetAsync(state.pet);
    } catch {}
  }

  function changeNoName() {
    setNoName(!noName);
    if (!noName) changeValue("", "name");
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
      />
      <View style={styles.container}>
        <InputImage image={state.pet.image} changeImage={changeValue} />
        <ScrollView>
          {/** PASAR A INPUTNAME */}
          <View style={styles.row}>
            <InputName
              name={state.pet.name}
              noName={noName}
              changeName={changeValue}
              changeNoName={changeNoName}
            />
          </View>
          <View style={styles.containerAcction}>
            <PanelButtons
              changeOption={(t) => changeValue(t.toString(), "action")}
              option={optAcion}
              labels={LABELS_ACCTION}
            />
          </View>

          {/** PASAR A INPUTTYPE */}
          <View style={[styles.row, { gap: 50 }]}>
            <InputOption
              title="Mascota"
              optOne={state.pet.type === "DOG"}
              optTwo={state.pet.type === "CAT"}
              changeOption={(opt) => {
                changeValue(opt, "type");
              }}
              icon={[
                <IconSymbol
                  size={25}
                  name={"dog"}
                  color={state.pet.type === "DOG" ? "#4B4B4B" : "#A5A5A5"}
                />,
                <IconSymbol
                  size={25}
                  name={"cat"}
                  color={state.pet.type === "CAT" ? "#4B4B4B" : "#A5A5A5"}
                />,
              ]}
            />

            {/** PASAR A INPUTSEX */}
            <InputOption
              title="Sexo"
              optOne={state.pet.sex === "FEMALE"}
              optTwo={state.pet.sex === "MALE"}
              changeOption={(opt) => {
                changeValue(opt, "sex");
              }}
              icon={[
                <IconSymbol
                  size={25}
                  name={"female"}
                  color={state.pet.sex === "FEMALE" ? "#4B4B4B" : "#A5A5A5"}
                />,
                <IconSymbol
                  size={25}
                  name={"male"}
                  color={state.pet.sex === "MALE" ? "#4B4B4B" : "#A5A5A5"}
                />,
              ]}
            />
          </View>

          {/** PASAR A INPUTAGE */}
          <View style={[styles.row, { gap: 5 }]}>
            <InputAge
              age={state.pet.age}
              type={state.pet.ageType}
              changeAge={changeValue}
              changeAgeType={changeValue}
            />
            {/** PASAR A INPUTSIZE */}
            <InputSize option={optSize} chageOption={changeValue} />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInputCustom
              label={"Descripción (" + (200 - description.length) + ")"}
              options={{
                numberOfLines: 4,
                maxLength: 200,
                value: state.pet.description,
                onChangeText: (t) => changeValue(t, "description"),
                placeholder: PLACEHOLDER_DESCRIPTION[optAcion],
              }}
              multiline={true}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Button label="Crear" onPress={savePet} />
          </View>
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerAcction: {
    alignItems: "center",
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
});
