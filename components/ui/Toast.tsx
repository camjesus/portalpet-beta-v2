import { Validation } from "@/models";
import React, { useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  validation: Validation;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Toast({ validation, setToast }: Props) {
  const [height, setHeight] = useState(0);
  const bottom = React.useRef(new Animated.Value(-80)).current;
  const opacity = React.useRef(new Animated.Value(3)).current;

  function animate() {
    Animated.timing(bottom, {
      toValue: 40,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => {
        setToast(false);
      });
    });
  }

  React.useEffect(() => {
    animate();
  }, []);

  return (
    <Animated.View
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      style={[
        styles.container,
        { top: "50%", transform: [{ translateY: -height / 2 }], opacity },
      ]}>
      <Text style={{ fontSize: 25 }}>💬</Text>
      <View style={{ marginLeft: scale(12), flexShrink: 1 }}>
        <Text style={styles.title}>{validation.type}</Text>
        <Text style={styles.message}>{validation.msg}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    alignContent: "center",
    borderColor: "#DCAD5F",
    borderWidth: scale(2),
    left: scale(20),
    right: scale(20),
  },
  message: {
    color: "#4B4B4B",
    fontSize: scale(15),
  },
  title: {
    color: "#ffb13d",
    fontWeight: "bold",
  },
});
