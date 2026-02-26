import { Button, ViewCustom, IconSymbol, HeaderCustom } from "@/components/ui";
import React, { useReducer } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "react-native-size-matters";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/FirebaseConfig";
import { defaultImg } from "@/assets/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ACTION, petReducer } from "@/hooks/reducers/usePet";
import * as Crypto from "expo-crypto";

export default function LoadImage() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const { pet } = state.statePet;

  function changeValue(value: any, field: string) {
    dispatch({
      type: ACTION.CHANGE_INPUT,
      payload: {
        field: field,
        value: value,
      },
    });
  }

  const takePhotoAndUpload = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Permiso de cámara denegado");
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return null;

    const uri = result.assets[0].uri;
    //const response = await fetch(uri);
    //const blob = await response.blob();
    //const id = Crypto.randomUUID();
    //const storageRef = ref(storage, `petImages/${id}`);
    //await uploadBytes(storageRef, blob);
    //const url = await getDownloadURL(storageRef);

    if (uri) {
      changeValue(uri, "image");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      changeValue(result.assets[0].uri, "image");
    }
  };

  const handlePhoto = async () => {
    try {
      await takePhotoAndUpload();
    } catch (e) {
      console.error(e);
    }
  };

  function goToMap() {
    //router.push("/map");
  }
  function next() {
    router.push({
      pathname: "/managementPet/loadLocation",
      params: { stringItem: JSON.stringify(state) },
    });
    console.log(JSON.stringify(state));
  }
  return (
    <>
      <ViewCustom>
        <HeaderCustom
          title="Nueva mascota"
          childrenLeft={
            <Link href={"/(tabs)/myPets"}>
              <IconSymbol size={30} name="arrow-back" color="white" />
            </Link>
          }
        />
        <Image
          source={pet.image === defaultImg ? defaultImg : { uri: pet.image }}
          style={[styles.image]}
        />
        <View style={styles.row}>
          <Button circle={true} onPress={handlePhoto}>
            <IconSymbol size={25} name="add-image" color={"#4B4B4B"} />
          </Button>
          <Button circle={true} onPress={pickImage}>
            <IconSymbol size={25} name="gallery" color={"#4B4B4B"} />
          </Button>
          <View style={{ position: "absolute", right: scale(20) }}>
            <Button circle={true} onPress={next} disabled={pet.image === defaultImg}>
              <IconSymbol size={25} name="arrow-next" color={pet.image === defaultImg ? "#A5A5A5" : "white"} />
            </Button>
          </View>
        </View>
      </ViewCustom>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: scale(40),
    justifyContent: "flex-start",
    paddingLeft: scale(40),
    bottom: scale(30),
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  imageRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    resizeMode: "center",
  },
});
