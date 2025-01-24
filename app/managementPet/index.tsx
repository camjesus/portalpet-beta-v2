import { StyleSheet, View } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState, useReducer, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import { User } from "@/models/User";
import { petReducer, initalPet, ACTION } from "@/hooks/usePetReducer";
import { savePetAsync } from "@/service/useDataBase";
//components
import { IconSymbol } from "@/components/ui/IconSymbol";
import HeaderCustom from "@/components/ui/HeaderCustom";
import InputName from "./components/InputName";
import InputSize from "./components/InputSize";
import InputAge from "./components/InputAge";
import Button from "@/components/ui/Button";
import InputImage from "./components/InputImage";
import Toast from "@/components/ui/Toast";
import InputType from "./components/InputType";
import InputSex from "./components/InputSex";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import InputAction from "./components/InputAction";
import InputDescription from "./components/InputDescription";

export default function ManagementPet() {
  const [noName, setNoName] = useState(false);
  const [optAcion, setAcion] = useState(0);
  const [optSize, setSize] = useState(0);
  const [state, dispatch] = useReducer(petReducer, initalPet);
  const [toast, setToast] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const { uid, name, lastname } = useLocalSearchParams<{
    uid: string;
    name: string;
    lastname: string;
  }>();

  useEffect(() => {
    console.log("user my pets", uid, name, lastname);
    if (uid !== undefined) {
      setUser({ uid: uid, name: name, lastname: lastname });
    }
  }, []);

  function changeValue(value: string, field: string) {
    dispatch({
      type: ACTION.CHANGE_INPUT,
      payload: {
        field: field,
        value: value,
      },
    });
  }

  async function savePet() {
    setToast(true);
    try {
      await savePetAsync(state.pet, user);
    } catch {
      throw Error("error en savePetAsync");
    }
    router.push({ pathname: "/(tabs)/myPets", params: { search: "yes" } });
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
          <View style={styles.row}>
            <InputName
              name={state.pet.name}
              noName={noName}
              changeName={changeValue}
              changeNoName={changeNoName}
            />
          </View>
          <View style={styles.containerCenter}>
            <InputAction
              option={optAcion}
              changeValue={setAcion}
              changeOption={changeValue}
            />
          </View>
          <View style={[styles.row, { gap: scale(50) }]}>
            <InputType type={state.pet.type} changeValue={changeValue} />
            <InputSex sex={state.pet.sex} changeValue={changeValue} />
          </View>
          <View style={[styles.row, { gap: scale(5) }]}>
            <InputAge
              age={state.pet.age}
              type={state.pet.ageType}
              changeAge={changeValue}
              changeAgeType={changeValue}
            />
            <InputSize
              option={optSize}
              changeValue={setSize}
              changeOption={changeValue}
            />
          </View>

          <View style={{ marginTop: scale(16) }}>
            <InputDescription
              optAcion={optAcion}
              description={state.pet.description}
              changeValue={changeValue}
            />
          </View>
          <View style={styles.submit}>
            <Button label="Crear" onPress={savePet} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.containerCenter}>
        {toast && (
          <Toast
            title="Eureka!"
            message="La mascota se ha creado con éxito!"
            setToast={setToast}
          />
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    alignItems: "center",
    marginTop: scale(16),
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginTop: scale(16),
  },
  container: {
    flex: 1,
  },
  submit: {
    marginBottom: scale(16),
  },
});
