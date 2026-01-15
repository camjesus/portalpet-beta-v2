import Button from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/FirebaseConfig";
import * as Crypto from "expo-crypto";

const id = Crypto.randomUUID();

type Props = {
  changeImage: (text: string, field: string) => void;
};

export default function InputImage({ changeImage }: Props) {
  const [active, setActive] = useState(false);

  const takePhotoAndUpload = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Permiso de cámara denegado");
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
      aspect: [2, 4],
      allowsEditing: true,
    });

    if (result.canceled) return null;

    const uri = result.assets[0].uri;
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `petImages/${id}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);

    if (url) {
      setActive(true);
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
      <View style={styles.viewRowIcon}>
        <Button circle={true} onPress={handlePhoto}>
          <IconSymbol
            size={25}
            name="add-image"
            color={active ? "#A5A5A5" : "#4B4B4B"}
          />
        </Button>
        <Button circle={true} onPress={goToMap}>
          <IconSymbol size={25} name="add-location" color={"#4B4B4B"} />
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewRowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: scale(70),
    marginEnd: scale(60),
    marginTop: scale(-40),
    marginBottom: scale(5),
  },
});
