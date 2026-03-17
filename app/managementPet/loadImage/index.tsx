import { Button, ViewCustom, IconSymbol, HeaderCustom } from "@/components/ui";
import React, { useReducer, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "react-native-size-matters";
import { defaultImg } from "@/assets/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ACTION, petReducer } from "@/hooks/reducers/usePet";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadImage } from "@/services/utils/cloudinary";
import { Loading } from "@/components/ui";

export default function LoadImage() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const [uploading, setUploading] = useState(false);
  const { pet } = state.statePet;

  function changeValue(value: any, field: string) {
    dispatch({
      type: ACTION.CHANGE_INPUT,
      payload: { field, value },
    });
  }

  const compressImage = async (uri: string) => {
    const compressed = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
    );
    return compressed.uri;
  };

  const takePhotoAndUpload = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") throw new Error("Permiso de cámara denegado");

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (result.canceled) return;

    const compressed = await compressImage(result.assets[0].uri);
    changeValue(compressed, "image");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled) {
      const compressed = await compressImage(result.assets[0].uri);
      changeValue(compressed, "image");
    }
  };

  const handlePhoto = async () => {
    try {
      await takePhotoAndUpload();
    } catch (e) {
      console.error(e);
    }
  };

  async function next() {
    router.push({
      pathname: "/managementPet/loadLocation",
      params: { stringItem: JSON.stringify(state) },
    });
  }

  return (
    <ViewCustom>
      <HeaderCustom
        title="Nueva mascota"
        childrenLeft={
          <Link href={"/(tabs)/myPets"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {uploading && <Loading />}
      {!uploading && (
        <>
          <View style={{ flex: 1, width: "100%" }}>
            <Image
              source={
                pet.image === defaultImg ? defaultImg : { uri: pet.image }
              }
              style={styles.image}
            />
          </View>
          <View style={styles.row}>
            <Button circle={true} onPress={handlePhoto}>
              <IconSymbol size={25} name="add-image" color={"#4B4B4B"} />
            </Button>
            <Button circle={true} onPress={pickImage}>
              <IconSymbol size={25} name="gallery" color={"#4B4B4B"} />
            </Button>
            <View style={{ position: "absolute", right: scale(20) }}>
              <Button
                circle={true}
                onPress={next}
                disabled={pet.image === defaultImg}>
                <IconSymbol
                  size={25}
                  name="arrow-next"
                  color={pet.image === defaultImg ? "#A5A5A5" : "white"}
                />
              </Button>
            </View>
          </View>
        </>
      )}
    </ViewCustom>
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
  image: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    resizeMode: "cover",
    marginTop: 10,
    borderRadius: 10,
  },
});
