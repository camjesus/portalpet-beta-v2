import Button from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "react-native-size-matters";

type Props = {
  changeImage: (text: string, field: string) => void;
};

export default function InputImage({ changeImage }: Props) {
  const [permissions, requestPermission] = ImagePicker.useCameraPermissions();
  const [active, setActive] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [2, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setActive(true);
      changeImage(result.assets[0].uri, "image");
    }
  };

  return (
    <>
      <View style={styles.viewRowIcon}>
        <Button
          circle={true}
          onPress={
            permissions?.status === ImagePicker.PermissionStatus.GRANTED
              ? pickImage
              : requestPermission
          }>
          <IconSymbol
            size={25}
            name="add-image"
            color={active ? "#4B4B4B" : "#A5A5A5"}
          />
        </Button>
        <Button circle={true}>
          <IconSymbol
            size={25}
            name="add-location"
            color={active ? "#4B4B4B" : "#A5A5A5"}
          />
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
