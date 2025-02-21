import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, View, Image } from "react-native";
import { scale } from "react-native-size-matters";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function Loading() {
  const sv = useSharedValue<number>(0);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Image
          style={styles.image}
          source={require("@/assets/images/react-logo.png")}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: scale(45),
    height: scale(45),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
  },
  box: {
    height: scale(50),
    width: scale(50),
    backgroundColor: "#ffb13d",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
