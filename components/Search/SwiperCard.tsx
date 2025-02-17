import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import React, { act, useEffect, useState } from "react";
import { loadPet } from "@/service/utils/usePet";
import { Pet, PetId } from "@/models/Pet";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "../ui/IconSymbol";
import Button from "../ui/Button";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Link, router } from "expo-router";

type Props = {
  petId: string;
  item: PetId;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
};

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function SwiperCard({
  petId,
  item,
  numOfCards,
  index,
  activeIndex,
}: Props) {
  const { pet } = item;
  const [data, setData] = useState({ name: "", action: "", color: "" });
  const translationX = useSharedValue(0);

  console.log("PETimage", encodeURI(pet.image));

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1]
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1]
        ),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [-23, 0, 0]
        ),
      },
      {
        translateX: translationX.value,
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15]
        )}deg`,
      },
    ],

  }));

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;

      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 200],
        [index, index + 0.9]
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        translationX.value = withSpring(Math.sign(event.velocityX) * 600, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(index + 1);

        event.velocityX > 0;
      } else {
        translationX.value = withSpring(0);
      }
    });

  useEffect(() => {
    let { name, action, color } = loadPet(pet);
    setData({ name: name, action: action, color: color });
  }, []);

  function goToPetProfile(petId: string, pet: Pet) {
    router.push({
      pathname: "/petProfile",
      params: {
        petId: petId,
        stringItem: JSON.stringify(item),
        image: encodeURI(pet.image),
      },
    });
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - index,
          },
        ]}>
        <Image
          style={[styles.image, StyleSheet.absoluteFillObject]}
          source={{ uri: pet.image }}
        />
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
          <View style={styles.sexIcon}>
            <IconSymbol
              name={pet?.sex === "MALE" ? "male" : "female"}
              size={35}
              color="#4B4B4B"
            />
          </View>
        </View>
        <View style={styles.moreInfo}>
          <Button label="Ver ficha" onPress={() => goToPetProfile(petId, pet)}>
            <IconSymbol size={25} name="clipboard" color="#4B4B4B" />
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth - scale(40),
    height: screenHeight - scale(240),
    borderRadius: 25,
    justifyContent: "flex-end",

    position: "absolute",
    elevation: 10,
    backgroundColor: "white",
  },
  pawSize: {
    flexDirection: "row",
    alignItems: "baseline",
    alignContent: "center",
    justifyContent: "space-between",
    position: "absolute",
    marginStart: scale(15),
    margin: scale(5),
    bottom: scale(5),
    left: 0,
    gap: scale(6),
  },
  moreInfo: {
    position: "absolute",
    margin: scale(10),
    right: 0,
    bottom: scale(5),
    elevation: 10,
  },
  footer: {
    marginTop: scale(20),
    margin: scale(10),
    marginBottom: scale(50),
    flexDirection: "row",
  },
  image: {
    borderWidth: 3,
    borderColor: "white",
    width: screenWidth - scale(40),
    height: screenHeight - scale(290),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
  },
  name: {
    fontSize: scale(28),
    marginBottom: scale(15),
    color: "#ffb13d",
    fontWeight: "bold",
  },
  sexIcon: {
    marginHorizontal: scale(5),
  },
});
