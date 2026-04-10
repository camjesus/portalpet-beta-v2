import { View, Image, StyleSheet, Pressable, Text } from "react-native";
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
  const hasImage = pet.image !== defaultImg;

  return (
    <>
      <View style={{ flex: 1, width: "100%" }}>
        <Image
          source={pet.image === defaultImg ? defaultImg : { uri: pet.image }}
          style={styles.image}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.sourceButtons}>
          <Pressable
            style={({ pressed }) => [styles.sourceBtn, pressed && styles.sourceBtnPressed]}
            onPress={handlePhoto}>
            <IconSymbol size={scale(22)} name="add-image" color="white" />
            <Text style={styles.sourceBtnLabel}>Cámara</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.sourceBtn, pressed && styles.sourceBtnPressed]}
            onPress={pickImage}>
            <IconSymbol size={scale(22)} name="gallery" color="white" />
            <Text style={styles.sourceBtnLabel}>Galería</Text>
          </Pressable>
        </View>

        <Button circle={true} onPress={next} disabled={!hasImage}>
          <IconSymbol
            size={25}
            name="arrow-next"
            color={!hasImage ? "#b6b6b6ff" : "white"}
          />
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingBottom: scale(16),
    width: "100%",
  },
  sourceButtons: {
    flexDirection: "row",
    gap: scale(12),
  },
  sourceBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    backgroundColor: "#ffb13d",
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: 40,
  },
  sourceBtnPressed: {
    backgroundColor: "#DCAD5F",
  },
  sourceBtnLabel: {
    color: "white",
    fontSize: scale(13),
    fontWeight: "500",
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
