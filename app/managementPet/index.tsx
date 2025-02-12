import { StyleSheet, View } from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { useState, useReducer, useEffect } from "react";
import { scale } from "react-native-size-matters";
import { User } from "@/models/User";
import { petReducer, initalPet, ACTION } from "@/hooks/reducers/usePet";
import { savePetAsync } from "@/service/dataBase/usePet";
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
import ViewCustom from "@/components/ViewCustom";
import InputAction from "./components/InputAction";
import InputDescription from "./components/InputDescription";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { validatePet } from "@/service/utils/usePet";

export default function ManagementPet() {
  const [noName, setNoName] = useState(false);
  const [optAcion, setAcion] = useState(0);
  const [optSize, setSize] = useState(0);
  const [state, dispatch] = useReducer(petReducer, initalPet);
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState<User>();
  const [toastConfig, setToastConfig] = useState({
    title: "Eureka!",
    message: "La mascota se ha creado con éxito!",
  });

  const { uid, name, lastname } = useLocalSearchParams<{
    uid: string;
    name: string;
    lastname: string;
  }>();
  var scrollY = useSharedValue(0);
  const default_image = "./components/default.png";

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

  useEffect(() => {
    if (uid !== undefined) {
      setUser({ uid: uid, name: name, lastname: lastname });
    }
  }, []);

  function changeValue(value: any, field: string) {
    dispatch({
      type: ACTION.CHANGE_INPUT,
      payload: {
        field: field,
        value: value,
      },
    });
  }

  async function savePet() {
    var errorMessage = validatePet(state.pet, noName);

    if (errorMessage !== "") {
      setToastConfig({
        title: "Validación",
        message: errorMessage,
      });
      setToast(true);
      return;
    } else {
      setToastConfig({
        title: "Eureka!",
        message: "La mascota se ha creado con éxito!",
      });
    }
    setToast(true);
    try {
      await savePetAsync(state.pet, user);
    } catch(error) {
      throw Error("error en ManagementPet: savePetAsync" + error);
    }
    router.push({ pathname: "/(tabs)/myPets", params: { search: "yes" } });
  }

  function changeNoName() {
    setNoName(!noName);
    if (!noName) changeValue("", "name");
  }

  const IMAGE_HEIGHT = scale(300);
  const imageStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.get(),
      [0, IMAGE_HEIGHT],
      [IMAGE_HEIGHT, 200]
    );

    return {
      height,
    };
  });

  return (
    <ViewCustom>
      <HeaderCustom
        title="Nueva mascota"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      <View style={styles.container}>
        <Animated.Image
          source={
            state.pet.image === default_image
              ? require(default_image)
              : { uri: state.pet.image }
          }
          style={[styles.image, imageStyle]}
        />

        <InputImage changeImage={changeValue} />
        <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={10}>
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
              age={state.pet.age !== null ? state.pet.age?.toString() : ""}
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
        </Animated.ScrollView>
      </View>
      <View style={styles.containerCenter}>
        {toast && (
          <Toast
            title={toastConfig.title}
            message={toastConfig.message}
            setToast={setToast}
          />
        )}
      </View>
    </ViewCustom>
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
  image: {
    width: scale(340),
    height: scale(300),
    marginHorizontal: scale(10),
    borderRadius: 10,
    marginTop: scale(10),
    resizeMode: "center",
  },
});
