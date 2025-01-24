import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import React, { act, useEffect, useState } from "react";
import { loadPet } from "@/hooks/useLoadPet";
import { Pet } from "@/models/Pet";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "../ui/IconSymbol";
import { Link } from "expo-router";
import Button from "../ui/Button";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  pet: Pet;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
};

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function SwiperCard({
  pet,
  numOfCards,
  index,
  activeIndex,
}: Props) {
  const [data, setData] = useState({ name: "", action: "", color: "" });

  const translationX = useSharedValue(0);

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
        [index, index + 0.8]
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
    console.log("efect" + name, action, color);
    setData({ name: name, action: action, color: color });
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - index,
          },
        ]}
      >
        <Image
          style={[styles.image, StyleSheet.absoluteFillObject]}
          source={{ uri: pet.image }}
        />
        <View style={styles.pawSize}>
          <IconSymbol
            name="paw"
            size={45}
            color={pet?.size === "BIG" ? "#9575cd" : "#FFFFFF"}
          />
          <IconSymbol
            name="paw"
            size={35}
            color={pet?.size === "MEDIUM" ? "#9575cd" : "#FFFFFF"}
          />
          <IconSymbol
            name="paw"
            size={25}
            color={pet?.size === "SMALL" ? "#9575cd" : "#FFFFFF"}
          />
        </View>
        <View style={styles.moreInfo}>
          <Button label="Ver ficha">
            <IconSymbol size={25} name="clipboard" color="#4B4B4B" />
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{pet?.name}</Text>
          <Text style={styles.old}>, {pet?.age} años</Text>
          <View style={styles.sexIcon}>
            <IconSymbol
              name={pet?.sex === "MALE" ? "male" : "female"}
              size={35}
              color="#4B4B4B"
            />
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth - scale(40),
    height: screenHeight - scale(250),
    borderRadius: 25,
    justifyContent: "flex-end",

    position: "absolute",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: "white",
  },
  pawSize: {
    flexDirection: "row",
    alignItems: "baseline",
    alignContent: "center",
    position: "absolute",
    marginStart: scale(10),
    margin: scale(10),
    bottom: scale(50),
    left: 0,
    gap: scale(10),
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
    flexDirection: "row",
  },
  image: {
    borderWidth: 3,
    borderColor: "white",
    width: screenWidth - scale(40),
    height: screenHeight - scale(300),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
  },
  name: {
    fontSize: scale(28),
    marginBottom: scale(5),
    fontWeight: "bold",
  },
  old: {
    fontSize: scale(28),
    fontWeight: "bold",
  },
  sexIcon: {
    marginHorizontal: scale(5),
  },
});
