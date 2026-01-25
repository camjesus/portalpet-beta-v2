import { Button, ViewCustom, IconSymbol } from "@/components/ui";
import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "react-native-size-matters";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/FirebaseConfig";
import * as Crypto from "expo-crypto";
import { defaultImg } from "@/assets/images";
import { useLocalSearchParams } from "expo-router";
import { ACTION, initialPet, petReducer } from "@/hooks/reducers/usePet";

const id = Crypto.randomUUID();

type Props = {
  changeImage: (text: string, field: string) => void;
};

export default function LoadImage({ changeImage }: Props) {
  const { stringItem } = useLocalSearchParams<{
    stringItem: string;
  }>();
  const petObj = stringItem && JSON.parse(stringItem);
  const [state, dispatch] = useReducer(
    petReducer,
    petObj ? petObj.pet : initialPet,
  );
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
      //aspect: [2, 4],
      //allowsEditing: true,
    });

    if (result.canceled) return null;

    const uri = result.assets[0].uri;
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `petImages/${id}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);

    if (url) {
      changeImage(url, "image");
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

  return (
    <>
      <ViewCustom>
        <Image
          source={
            state.pet.image === defaultImg
              ? defaultImg
              : { uri: state.pet.image }
          }
          style={[styles.image]}
        />
        <Button circle={true} onPress={handlePhoto}>
          <IconSymbol size={25} name="add-image" color={"#4B4B4B"} />
        </Button>
        <Button circle={true} onPress={goToMap}>
          <IconSymbol size={25} name="add-location" color={"#4B4B4B"} />
        </Button>
      </ViewCustom>
    </>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    justifyContent: "center",
    alignItems: "center",
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
function dispatch(arg0: { type: any; payload: { field: string; value: any } }) {
  throw new Error("Function not implemented.");
}
