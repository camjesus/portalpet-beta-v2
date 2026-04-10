import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { loadPet } from "@/services/utils/usePet";
import { PetId } from "@/models";
import { scale } from "react-native-size-matters";
import { Link, router } from "expo-router";
import { Button, IconSymbol } from "../ui";

type Props = {
  item: PetId;
};

export default function Card({ item }: Props) {
  const [data, setData] = useState({ name: "", action: "", color: "" });
  const statePet = { statePet: item };
  
  useEffect(() => {
    let data = loadPet(item.pet);
    setData(data);
  }, []);

  function goToPetProfile() {
    router.push({ pathname: "/managementAdoption", params: { petId: item.id } 
  })
  }

  return (
    <Pressable onPress={goToPetProfile}>
      <View
        style={[styles.card, { borderColor: data.color, overflow: "hidden" }]}>
        <View>
          <Image source={{ uri: item.pet.image }} style={[styles.image]} />
          <View style={styles.float}>
            <Link
              href={{
                pathname: "/managementPet/loadData",
                params: {
                  stringItem: JSON.stringify(statePet),
                  image: encodeURI(item.pet.image),
                },
              }}>
              <IconSymbol size={30} name="edit" color="white" />
            </Link>
          </View>
          <Text style={[styles.labelAcction, { backgroundColor: data.color }]}>
            {data.action}
          </Text>
        </View>

        <Text style={styles.textName}>{data.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  float: {
    right: 10,
    top: 10,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.32)",
    borderRadius: 20,
    padding: scale(6),
  },
  card: {
    borderRadius: 20,
    borderWidth: scale(2),
    width: scale(150),
    height: scale(250),
    alignItems: "center",
    alignContent: "center",
    marginRight: scale(10),
    marginBottom: scale(10),
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  image: {
    width: scale(150),
    height: scale(200),
    borderTopEndRadius: 8,
    borderStartStartRadius: 8,
    marginBottom: scale(8),
  },
  textName: {
    color: "black",
    textAlign: "center",
    fontSize: scale(15),
    marginHorizontal: scale(10),
  },
  labelAcction: {
    position: "absolute",
    bottom: scale(3),
    left: scale(8),
    paddingVertical: scale(3),
    paddingHorizontal: scale(8),
    color: "white",
    fontWeight: "bold",
    fontSize: scale(11),
    borderRadius: 6,
    overflow: "hidden",
  },
});
