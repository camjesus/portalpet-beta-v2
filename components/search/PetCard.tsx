import { PetId } from "@/models";
import { router } from "expo-router";
import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { IconSymbol } from "../ui";
import { scale } from "react-native-size-matters";
import { toggleLike, isLiked } from "@/services/storage/likesStorage";
import { useEffect, useState } from "react";
import { formatAge, getPetName, SEX_LABEL, TYPE_LABEL } from "../petProfile/petProfileUtils";
import { PetWithDistance } from "@/models";
import { useLike } from "@/features/pet/hooks/useLike";

type Props = {
  item: PetWithDistance;
  onUnlike?: (id: string) => void;
};

export function PetCard({ item, onUnlike }: Props) {
  const { liked, handleLike } = useLike(item, onUnlike);
  const { pet } = item;
  const petName = getPetName(pet.name);
  const age = formatAge(pet.age, pet.ageType);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/petProfile",
          params: {
            petId: item.id,
            stringItem: JSON.stringify(item),
            image: encodeURI(pet.image),
            isMy: "false",
          },
        })
      }
      style={styles.card}>

      <View style={styles.imageContainer}>
        <Image source={{ uri: pet.image }} style={styles.image} />
        <Pressable
          style={styles.likeButton}
          onPress={(e) => {
            e.stopPropagation();
            handleLike();
          }}>
          <IconSymbol
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "#E57373" : "white"}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{petName}</Text>
          <IconSymbol
            name={"location"}
            size={14}
            color="#ffb13d"
          />
          <Text style={styles.distance} numberOfLines={1}>{item.distanceKm?.toFixed(2)} km</Text>        
        </View>

        <View style={styles.metaRow}>
          <View style={styles.chipRow}>
          {pet.type && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{TYPE_LABEL[pet.type] ?? pet.type}</Text>
                <IconSymbol
                name={pet.type === "DOG" ? "dog" : "cat"}
                size={18}
                color="#ffb13d"
              />
            </View>
          )}
          {pet.sex && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{SEX_LABEL[pet.sex] ?? pet.sex}</Text>
              <IconSymbol
                name={pet.sex === "MALE" ? "male" : "female"}
                size={14}
                color="#ffb13d"
              />
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  distance:{
    color:"#ffb13d",
    fontSize: scale(12),
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: scale(12),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imageContainer: {
    width: "100%",
    height: scale(250),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,

  },
  actionChip: {
    position: "absolute",
    top: scale(10),
    left: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: 20,
  },
  actionText: {
    color: "white",
    fontSize: scale(10),
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  likeButton: {
    position: "absolute",
    top: scale(8),
    right: scale(10),
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 20,
    padding: scale(6),
  },
  content: {
    padding: scale(12),
    gap: scale(6),
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  name: {
    color: "#151718",
    fontSize: scale(16),
    fontWeight: "bold",
    flex: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  metaText: {
    color: "#777",
    fontSize: scale(12),
  },
  dot: {
    color: "#ffb13d",
    fontSize: scale(12),
  },
  description: {
    color: "#777",
    fontSize: scale(12),
    lineHeight: scale(18),
    marginTop: scale(2),
  },

  chipRow: {
    flexDirection: "row",
    gap: scale(6),
  },
  chip: {
    backgroundColor: "rgba(255,177,61,0.2)",
    borderWidth: 1,
    borderColor: "#ffb13d",
    borderRadius: 20,
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(3),
  },
  chipText: {
    color: "#ffb13d",
    fontSize: scale(11),
    fontWeight: "600",
  },
});
