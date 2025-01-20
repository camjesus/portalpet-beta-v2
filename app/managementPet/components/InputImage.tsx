import Button from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Alert, Image, View } from "react-native";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "react-native-size-matters";

type Props = {
  image: string;
  changeImage: (text: string, field: string) => void;
};

export default function InputImage({ image, changeImage }: Props) {
  const [permissions, requestPermission] = ImagePicker.useCameraPermissions();
  const default_image = "./default.png";

  console.log("image" + image);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      changeImage(result.assets[0].uri, "image");
    }
  };

  return (
    <>
      <View style={styles.imageRow}>
        <Image
          style={styles.image}
          source={
            image === default_image ? require(default_image) : { uri: image }
          }
        />
      </View>
      <View style={styles.viewRowIcon}>
        <Button
          circle={true}
          onPress={
            permissions?.status === ImagePicker.PermissionStatus.GRANTED
              ? pickImage
              : requestPermission
          }
        >
          <IconSymbol
            size={25}
            name="add-image"
            color={image !== default_image ? "#4B4B4B" : "#A5A5A5"}
          />
        </Button>
        <Button circle={true}>
          <IconSymbol
            size={25}
            name="add-location"
            color={image === default_image ? "#4B4B4B" : "#A5A5A5"}
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
  image: {
    width: scale(340),
    height: scale(280),
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: "center",
  },
  viewRowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(-40),
    marginHorizontal: scale(70),
    marginBottom: scale(5),
  },
});
