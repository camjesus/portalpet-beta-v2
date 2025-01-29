import { Pressable, View, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function InfoAnimated({ children }: Props) {
  const height = useSharedValue(0);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.get() }],
      height: height.get(),
    };
  });

  const handleExpand = () => {
    translateY.set(withTiming(SCREEN_HEIGHT - scale(360), { duration: 1000 }));
    height.set(withTiming(SCREEN_HEIGHT / 2, { duration: 1000 }));
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
  container: {
    flex: 1,
    justifyContent: "flex-end", // Comienza desde la parte inferior
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  animatedBox: {
    width: "90%",
    borderBottomLeftRadius: scale(60),
    borderBottomRightRadius: scale(60),
    bottom: 0,
    height: SCREEN_HEIGHT / 2,
    position: "absolute",
  },
});
