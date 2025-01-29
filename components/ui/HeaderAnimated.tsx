import { Pressable, View, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Link } from "expo-router";
import { IconSymbol } from "./IconSymbol";

type Props = {
  children?: React.ReactNode;
};

export default function HeaderAnimated({ children }: Props) {
  const height = useSharedValue(0);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.get(),
    };
  });

  const handleExpand = () => {
    height.set(
      withTiming((SCREEN_HEIGHT + scale(250)) / 2, { duration: 1000 })
    );
  };

  useEffect(() => {
    handleExpand();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBox, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLeft: {
    width: scale(30),
    marginStart: scale(30),
    marginTop: scale(20),
  },
  container: {
    justifyContent: "flex-start", // Comienza desde la parte superior
    alignItems: "center",
  },
  animatedBox: {
    width: "100%",
    backgroundColor: "#ffb13d",
    borderBottomLeftRadius: scale(60),
    borderBottomRightRadius: scale(60),
  },
  title: {
    fontSize: scale(30),
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: scale(15),
    padding: 0,
    marginBottom: 0,
    textTransform: "capitalize",
  },
});
