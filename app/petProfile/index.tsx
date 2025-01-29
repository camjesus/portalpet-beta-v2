import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import HeaderAnimated from "@/components/ui/HeaderAnimated";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useEffect } from "react";
import InfoAnimated from "./components/InfoAnimated";

export default function PetProfile() {
  const { petId, stringPet, image } = useLocalSearchParams<{
    petId: string;
    stringPet: string;
    image: string;
  }>();
  const pet = JSON.parse(stringPet);

  return (
    <View>
      <View>
        <HeaderAnimated
          children={
            <>
              <View style={styles.titleRow}>
                <View style={styles.buttonLeft}>
                  <Link href={"../"}>
                    <IconSymbol size={35} name="arrow-back" color="white" />
                  </Link>
                </View>
                <Text style={styles.title}>Ficha</Text>
                <IconSymbol
                  style={{ marginStart: scale(10) }}
                  size={30}
                  name="clipboard"
                  color="#4B4B4B"
                />
              </View>
              {pet.image && (
                <View style={styles.imageRow}>
                  <Image
                    style={styles.image}
                    defaultSource={{ uri: pet.image }}
                  />
                </View>
              )}
            </>
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
                <Text style={styles.field}>Nombre: </Text>
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
  buttonLeft: {
    width: scale(30),
    left: scale(30),
    paddingTop: scale(45),
    position: "absolute",
  },
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
    top: scale(-30),
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
    paddingTop: scale(60),
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
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
