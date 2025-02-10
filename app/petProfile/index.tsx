import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import HeaderAnimated from "@/components/ui/HeaderAnimated";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useEffect, useState } from "react";
import InfoAnimated from "./components/InfoAnimated";

const SCREEN_HEIGHT = (Dimensions.get("window").height / 2) * 0.2;

export default function PetProfile() {
  const { petId, stringPet, image } = useLocalSearchParams<{
    petId: string;
    stringPet: string;
    image: string;
  }>();
  const pet = JSON.parse(stringPet);
  console.log("pet", pet);
  console.log("petId", petId);

  function goToBack() {
    router.push("../");
  }

  function goToReport() {
    router.push({ pathname: "/report", params: { petId: petId } });
  }
  return (
    <View>
      <View>
        <HeaderAnimated
          childrenTitle={
            <>
              <View style={styles.titleRow}>
                <Text style={styles.title}>Ficha</Text>
                <IconSymbol
                  style={{ marginStart: scale(10) }}
                  size={30}
                  name="clipboard"
                  color="#4B4B4B"
                />
              </View>
              <View style={styles.imageRow}>
                {pet.image && (
                  <Image
                    style={styles.image}
                    source={{
                      uri: image,
                    }}
                  />
                )}
              </View>
            </>
          }
          onPressLeft={goToBack}
          onPressRight={goToReport}
          childrenRight={<IconSymbol size={35} name="bullhorn" color="white" />}
          childrenLeft={
            <IconSymbol size={35} name="arrow-back" color="white" />
          }
        />
      </View>

      <InfoAnimated
        children={
          <>
            <View style={styles.container}>
              <View style={styles.containerHeader}></View>
              <View style={styles.underline}>
                <Text style={styles.field}>Nombre: </Text>
                <Text style={styles.value}>{pet.name}</Text>
              </View>
              <View style={styles.underline}>
                <Text style={styles.field}>Sexo: </Text>
                <Text style={styles.value}>{pet.sex}</Text>
              </View>
              <View style={styles.underline}>
                <Text style={styles.field}>Descripción: </Text>
                <Text style={styles.value}>{pet.name}</Text>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    top: scale(-10),
    backgroundColor: "#A5A5A5",
    borderEndEndRadius: 20,
    borderEndStartRadius: 5,
    borderStartEndRadius: 20,
    borderStartStartRadius: 5,
    elevation: 10,
    height: scale(35),
    marginHorizontal: scale(20),
    borderWidth: 1,
    borderColor: "#828282",
  },
  underline: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "baseline",
    borderColor: "#A5A5A5",
  },
  title: {
    color: "#4B4B4B",
    fontSize: scale(25),
    fontWeight: "bold",
  },
  field: {
    color: "#4B4B4B",
    fontSize: scale(20),
    fontWeight: "bold",
  },
  value: {
    color: "#4B4B4B",
    fontSize: scale(20),
  },
  container: {
    top: scale(20) - SCREEN_HEIGHT,
    backgroundColor: "white",
    marginHorizontal: scale(20),
    paddingHorizontal: scale(30),
    paddingTop: scale(30),
    paddingBottom: scale(50),
    gap: scale(15),
    borderRadius: 5,
  },
  titleRow: {
    paddingBottom: scale(15),
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: scale(60),
  },
  imageRow: {
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    width: scale(290),
    height: scale(350),
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    elevation: 10,
  },
});
