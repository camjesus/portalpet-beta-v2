import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import HeaderAnimated from "@/components/ui/HeaderAnimated";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import InfoAnimated from "./components/InfoAnimated";
import Button from "@/components/ui/Button";
import ViewCustom from "@/components/ViewCustom";

const isBigger = Dimensions.get("screen").height > 830;
const SCREEN_HEIGHT = ((Dimensions.get("screen").height * 0.6) / 3) * 0.2;
console.log("dimension", Dimensions.get("screen").height);
export default function PetProfile() {
  const { petId, stringItem, image } = useLocalSearchParams<{
    petId: string;
    stringItem: string;
    image: string;
  }>();
  const item = JSON.parse(stringItem);

  const { pet } = item;

  function goToBack() {
    router.push({ pathname: "../", params: { search: "no" } });
  }

  function goToReport() {
    router.push({ pathname: "/report", params: { petId: petId } });
  }
  return (
    <ViewCustom>
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
                    <>
                      <Image
                        style={styles.image}
                        source={{
                          uri: image,
                        }}
                      />

                      <View style={styles.sexIcon}>
                        <IconSymbol
                          name={pet?.sex === "MALE" ? "male" : "female"}
                          size={45}
                          color="white"
                        />
                      </View>
                    </>
                  )}
                </View>
              </>
            }
            onPressLeft={goToBack}
            onPressRight={goToReport}
            childrenRight={
              <IconSymbol size={35} name="bullhorn" color="white" />
            }
            childrenLeft={
              <IconSymbol size={35} name="arrow-back" color="white" />
            }
          />
        </View>

        <InfoAnimated
          children={
            <>
              <View style={styles.container}>
                <View style={styles.row}>
                  <Text style={styles.field}>Nombre: </Text>
                  <Text style={styles.value}>{pet.name}</Text>
                  <View style={styles.pawSize}>
                    <IconSymbol
                      name="paw"
                      size={25}
                      color={pet?.size === "SMALL" ? "#ffb13d" : "#A5A5A5"}
                    />
                    <IconSymbol
                      name="paw"
                      size={35}
                      color={pet?.size === "MEDIUM" ? "#ffb13d" : "#A5A5A5"}
                    />
                    <IconSymbol
                      name="paw"
                      size={45}
                      color={pet?.size === "BIG" ? "#ffb13d" : "#A5A5A5"}
                    />
                  </View>
                </View>
                <Text style={styles.field}>Descripción: </Text>
                <Text style={styles.value}>{pet.description}</Text>
              </View>
            </>
          }
        />
      </View>
      <View style={styles.float}>
        <Button circle={true}>
          <Link
            href={{
              pathname: "/chat",
              params: {
                petId: petId,
                stringItem: stringItem,
              },
            }}>
            <IconSymbol size={30} name="chat" color="white" />
          </Link>
        </Button>
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    top: scale(-10),
    backgroundColor: "#A5A5A5",
    borderEndEndRadius: 10,
    borderEndStartRadius: 5,
    borderStartEndRadius: 10,
    borderStartStartRadius: 5,
    elevation: 10,
    height: scale(35),
    marginHorizontal: scale(20),
    borderWidth: 1,
    borderColor: "#828282",
  },
  row: {
    flexDirection: "row",
  },
  title: {
    color: "#4B4B4B",
    fontSize: scale(25),
    fontWeight: "bold",
  },
  field: {
    color: "#4B4B4B",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  value: {
    color: "#4B4B4B",
    fontSize: scale(15),
  },
  container: {
    top: isBigger ? scale(-50) : scale(20) - SCREEN_HEIGHT,
    backgroundColor: "white",
    marginHorizontal: scale(10),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(20),
    gap: scale(5),
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
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    width: scale(300),
    height: isBigger ? scale(400) : scale(390) - SCREEN_HEIGHT,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    elevation: 10,
  },
  pawSize: {
    position: "absolute",
    right: scale(5),
    flexDirection: "row",
    alignItems: "baseline",
    alignContent: "center",
    justifyContent: "space-between",
  },
  sexIcon: {
    flexDirection: "row",
    position: "absolute",
    marginStart: scale(15),
    bottom: scale(-5),
    gap: scale(6),
    padding: scale(3),
    borderRadius: 30,
    backgroundColor: "#ffb13d",
    borderWidth: 5,
    borderColor: "white",
  },
  float: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
});
