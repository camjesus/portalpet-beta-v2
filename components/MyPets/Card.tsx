import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import React, { act, useEffect, useState } from "react";
import { loadPet } from "@/hooks/useLoadPet";
import { Pet } from "@/models/Pet";

type Props = {
  pet: Pet;
};

export default function Card({ pet }: Props) {
  const [data, setData] = useState({ name: "", action: "", color: "" });

  useEffect(() => {
    let { name, action, color } = loadPet(pet);
    console.log("efect" + name, action, color);
    setData({ name: name, action: action, color: color });
  }, []);

  const { width } = Dimensions.get("window");

  return (
    <View style={[styles.card, { borderColor: data.color }]}>
      <Image
        source={{ uri: pet.image }}
        style={[styles.image, { width: width * 0.4 }]}
      />
      <Text style={styles.textName}>{data.name}</Text>
      <Text style={[styles.labelAcction, { backgroundColor: data.color }]}>
        {data.action}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: "center",
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
    aspectRatio: 1,
  },
  textName: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  labelAcction: {
    marginTop: 5,
    padding: 5,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    borderRadius: 15,
  },
});
