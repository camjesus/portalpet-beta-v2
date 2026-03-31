import { View, Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";
import { Pet } from "@/models";
import { formatAge, getPetName, TYPE_LABEL, SEX_LABEL } from "./petProfileUtils";

const isBigger = Dimensions.get("screen").height > 830;

type Props = {
  pet: Pet;
  image: string;
  isMy: boolean;
  goToBack: () => void;
  goToReport: () => void;
};

export function PetProfileHeader({ pet, image, isMy, goToBack, goToReport }: Props) {
  const petName = getPetName(pet.name);
  const age = formatAge(pet.age, pet.ageType);

  return (
    <View style={styles.header}>
      <Pressable style={styles.buttonLeft} onPress={goToBack}>
        <IconSymbol size={28} name="arrow-back" color="white" />
      </Pressable>

      {!isMy && (
        <Pressable style={styles.buttonRight} onPress={goToReport}>
          <IconSymbol size={26} name="bullhorn" color="white" />
        </Pressable>
      )}

      {pet.image && <Image style={styles.image} source={{ uri: image }} />}

      <View style={styles.imageOverlay}>
        <Text style={styles.petName}>{petName}</Text>
        <View style={styles.chipRow}>
          {pet.type && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{TYPE_LABEL[pet.type] ?? pet.type}</Text>
            </View>
          )}
          {pet.sex && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{SEX_LABEL[pet.sex] ?? pet.sex}</Text>
            </View>
          )}
          {age && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{age}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
  },
  buttonLeft: {
    position: "absolute",
    top: scale(55),
    left: scale(16),
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: scale(6),
  },
  buttonRight: {
    position: "absolute",
    top: scale(55),
    right: scale(16),
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: scale(6),
  },
  image: {
    width: "100%",
    height: isBigger ? scale(340) : scale(280),
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    paddingTop: scale(7),
    backgroundColor: "rgba(21, 23, 24, 0.34)",
  },
  petName: {
    color: "white",
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: scale(6),
  },
  chipRow: {
    flexDirection: "row",
    gap: scale(6),
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "rgba(255,177,61,0.2)",
    borderWidth: 1,
    borderColor: "#ffb13d",
    borderRadius: 20,
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
  },
  chipText: {
    color: "#ffb13d",
    fontSize: scale(11),
    fontWeight: "600",
  },
});
