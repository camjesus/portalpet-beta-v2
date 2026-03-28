import { View, Image, StyleSheet } from "react-native";
import { Button, IconSymbol } from "@/components/ui";
import { scale } from "react-native-size-matters";
import { defaultImg } from "@/assets/images";
import { Pet } from "@/models";

type Props = {
  pet: Pet;
  handlePhoto: () => void;
  pickImage: () => void;
  next: () => void;
};

export function ImageForm({ pet, handlePhoto, pickImage, next }: Props) {
  return (
    <>
      <View style={{ flex: 1, width: "100%" }}>
        <Image
          source={pet.image === defaultImg ? defaultImg : { uri: pet.image }}
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
          <Button circle={true} onPress={next} disabled={pet.image === defaultImg}>
            <IconSymbol
              size={25}
              name="arrow-next"
              color={pet.image === defaultImg ? "#A5A5A5" : "white"}
            />
          </Button>
        </View>
      </View>
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
  image: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    resizeMode: "cover",
    marginTop: 10,
    borderRadius: 10,
  },
});
