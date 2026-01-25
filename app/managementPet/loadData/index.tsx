import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { useState, useReducer } from "react";
import { scale } from "react-native-size-matters";
import { petReducer, initialPet, ACTION } from "@/hooks/reducers/usePet";
import { savePetAsync } from "@/service/dataBase/usePet";
import { KeyboardAvoidingView, Platform } from "react-native";
//components
import {
  IconSymbol,
  HeaderCustom,
  Button,
  Toast,
  ViewCustom,
  Loading,
} from "@/components/ui";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  InputName,
  InputSize,
  InputType,
  InputSex,
  InputAction,
  InputDescription,
} from "./components";
import { validatePet } from "@/service/utils/usePet";
import { defaultImg, logo } from "@/assets/images";
import InputImage from "./components/InputImage";

export default function ManagementPet() {
  const { stringItem } = useLocalSearchParams<{
    stringItem: string;
  }>();
  const petObj = stringItem && JSON.parse(stringItem);
  const [noName, setNoName] = useState(false);
  const [optAcion, setAcion] = useState(0);
  const [optSize, setSize] = useState(0);
  const [state, dispatch] = useReducer(
    petReducer,
    petObj ? petObj.pet : initialPet,
  );
  const [load, setLoad] = useState(false);
  const [toast, setToast] = useState(false);

  const [toastConfig, setToastConfig] = useState({
    title: "Eureka!",
    message: "La mascota se ha creado con éxito!",
  });

  var scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

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
    setLoad(true);
    console.log("petObj", petObj);
    await savePetAsync(petObj && petObj.id, state.pet);
    router.push({ pathname: "/(tabs)/myPets", params: { search: "yes" } });
    setLoad(false);
  }

  function changeNoName() {
    setNoName(!noName);
    if (!noName) changeValue("", "name");
  }

  function submit() {
    savePet();
  }

  const IMAGE_HEIGHT = scale(300);
  const imageStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.get(),
      [0, IMAGE_HEIGHT],
      [IMAGE_HEIGHT, 200],
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
      {load && <Loading />}
      {!load && (
        <View style={styles.container}>
          <Animated.Image
            source={
              state.pet.image === defaultImg
                ? defaultImg
                : { uri: state.pet.image }
            }
            style={[styles.image, imageStyle]}
          />

          <InputImage changeImage={changeValue} />
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
            <Animated.ScrollView
              onScroll={scrollHandler}
              scrollEventThrottle={10}>
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
                <Button label="Crear" onPress={submit} />
              </View>
            </Animated.ScrollView>
          </KeyboardAvoidingView>
          {toast && (
            <Toast
              title={toastConfig.title}
              message={toastConfig.message}
              setToast={setToast}
            />
          )}
        </View>
      )}
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
    alignItems: "center",
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
