import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { loadPet } from "@/service/utils/usePet";
import { Pet, PetId } from "@/models/Pet";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";

type Props = {
  item: PetId;
};

export default function Card({ item }: Props) {
  const [data, setData] = useState({ name: "", action: "", color: "" });

  useEffect(() => {
    let { name, action, color } = loadPet(item.pet);
    console.log("efect" + name, action, color);
    setData({ name: name, action: action, color: color });
  }, []);

  function goToPetProfile() {
    router.push({
      pathname: "/petProfile",
      params: {
        petId: item.docId,
        stringPet: JSON.stringify(item.pet),
        image: encodeURI(item.pet.image),
      },
    });
  }

  return (
    <Pressable onPress={goToPetProfile}>
      <View
        style={[styles.card, { borderColor: data.color, overflow: "hidden" }]}
      >
        <Image source={{ uri: item.pet.image }} style={[styles.image]} />
        <Text style={styles.textName}>{data.name}</Text>
        <Text style={[styles.labelAcction, { backgroundColor: data.color }]}>
          {data.action}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: scale(3),
    width: scale(150),
    height: scale(280),
    alignItems: "center",
    alignContent: "center",
    marginRight: scale(10),
    marginBottom: scale(15),
  },
  image: {
    width: scale(145),
    height: scale(200),
    borderTopEndRadius: 8,
    borderStartStartRadius: 8,
    marginBottom: scale(8),
  },
  textName: {
    color: "white",
    textAlign: "center",
    fontSize: scale(15),
    marginHorizontal: scale(10),
  },
  labelAcction: {
    marginTop: scale(3),
    padding: scale(5),
    paddingHorizontal: scale(10),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: scale(12),
    borderRadius: 5,
    bottom: scale(8),
    position: "absolute",
  },
});
