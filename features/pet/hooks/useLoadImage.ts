import { useReducer, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ACTION, petReducer } from "@/hooks/reducers/usePet";

export function useLoadImage() {
  const { stringItem } = useLocalSearchParams<{ stringItem: string }>();
  const parsedStatePet = stringItem ? JSON.parse(stringItem) : null;
  const [state, dispatch] = useReducer(petReducer, parsedStatePet);
  const [uploading, setUploading] = useState(false);
  const { pet } = state.statePet;

  function changeValue(value: any, field: string) {
    dispatch({ type: ACTION.CHANGE_INPUT, payload: { field, value } });
  }

  const compressImage = async (uri: string) => {
    const compressed = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
    );
    return compressed.uri;
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
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") throw new Error("Permiso de cámara denegado");

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 1,
      });
      if (result.canceled) return;

      const compressed = await compressImage(result.assets[0].uri);
      changeValue(compressed, "image");
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

  return { pet, uploading, handlePhoto, pickImage, next };
}
