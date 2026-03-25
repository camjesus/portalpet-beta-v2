import { PetId } from "@/models";
import { loadAction, loadPet } from "@/services/utils/usePet";
import { router } from "expo-router";
import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { IconSymbol } from "../ui";
import { scale } from "react-native-size-matters";
import { toggleLike, isLiked } from "@/services/storage/likesStorage";
import { useEffect, useState } from "react";

export function PetCard({ item }: { item: PetId }) {
  const { pet } = item;
  const { name } = loadPet(pet);
  const [liked, setLiked] = useState(false);
  const actionData = loadAction(pet.action);
  const actionColor = Array.isArray(actionData) ? actionData[1] : "#ffb13d";

  useEffect(() => {
    isLiked(item.id).then(setLiked);
  }, [item.id]);

  const handleLike = async () => {
    const newLiked = await toggleLike(item.id);
    setLiked(newLiked);
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/petProfile",
          params: {
            petId: item.id,
            stringItem: JSON.stringify(item),
            image: encodeURI(pet.image),
            isMy: "no",
          },
        })
      }>
      <View style={[styles.card, { borderLeftColor: actionColor }]}>
        <Image source={{ uri: pet.image }} style={styles.image} />
        <View style={styles.viewDesc}>
          <View style={styles.viewRow}>
            <IconSymbol
              name={pet.type === "DOG" ? "dog" : "cat"}
              size={22}
              color="#ffb13d"
            />
            <Text style={styles.textName}>{name}</Text>
          </View>
          <View style={styles.viewRow}>
            <IconSymbol
              name={pet.sex === "MALE" ? "male" : "female"}
              size={22}
              color="#A5A5A5"
            />
            <Text style={styles.textMeta}>
              {pet.age} {pet.ageType === "YEAR" ? "años" : "meses"}
            </Text>
          </View>
          <View style={styles.viewRow}>
            <IconSymbol
              name="paw"
              size={14}
              color={pet.size === "SMALL" ? "#ffb13d" : "#A5A5A5"}
            />
            <IconSymbol
              name="paw"
              size={18}
              color={pet.size === "MEDIUM" ? "#ffb13d" : "#A5A5A5"}
            />
            <IconSymbol
              name="paw"
              size={22}
              color={pet.size === "BIG" ? "#ffb13d" : "#A5A5A5"}
            />
          </View>
        </View>
        <Pressable
          style={styles.likeButton}
          onPress={(e) => {
            e.stopPropagation();
            handleLike();
          }}>
          <IconSymbol
            name={liked ? "heart" : "heart-outline"}
            size={26}
            color={liked ? "#E57373" : "#A5A5A5"}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    width: "100%",
    height: scale(120),
    marginBottom: scale(10),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0E6D3",
    borderLeftWidth: scale(4),
    borderLeftColor: "#ffb13d",
  },
  image: {
    width: scale(120),
    height: scale(120),
    resizeMode: "cover",
  },
  viewDesc: {
    flex: 1,
    paddingHorizontal: scale(12),
    flexDirection: "column",
    justifyContent: "center",
    gap: scale(8),
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  textName: {
    color: "#151718",
    fontSize: scale(15),
    fontWeight: "bold",
  },
  textMeta: {
    color: "#A5A5A5",
    fontSize: scale(13),
  },
  likeButton: {
    paddingRight: scale(14),
    paddingBottom: scale(10),
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
