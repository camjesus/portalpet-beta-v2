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
    //console.log("efect" + name, action, color);
    setData(data);
  }, []);
  console.log();
  function goToPetProfile() {
    router.push({
      pathname: "/petProfile",
      params: {
        petId: item.id,
        stringItem: JSON.stringify(item),
        image: encodeURI(item.pet.image),
      },
    });
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
        </View>

        <Text style={styles.textName}>{data.name}</Text>
        <Text style={[styles.labelAcction, { backgroundColor: data.color }]}>
          {data.action}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  float: {
    right: 10,
    top: 10,
    position: "absolute",
  },
  card: {
    borderRadius: 10,
    borderWidth: scale(3),
    width: scale(150),
    height: scale(280),
    alignItems: "center",
    alignContent: "center",
    marginRight: scale(10),
    marginBottom: scale(15),
    backgroundColor: "white",
  },
  image: {
    width: scale(145),
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
