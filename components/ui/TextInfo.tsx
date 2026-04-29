import { Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { scale } from "react-native-size-matters";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  shortText: string;
};

export function TextInfo({ text, shortText }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [displayShort, setDisplayShort] = useState(false);
  const rotateAnim = useRef(new Animated.Value(1)).current;
  const heightAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      collapse();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const collapse = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: -10,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
      setDisplayShort(true);
      translateAnim.setValue(10);
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const expand = () => {
    setDisplayShort(false);
    setIsOpen(true);
    translateAnim.setValue(-10);
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggle = () => {
    if (isOpen) {
      collapse();
    } else {
      expand();
    }
  };

  const arrowRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const textScale = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  return (
    <TouchableOpacity style={styles.container} onPress={toggle} activeOpacity={0.8}>
      <Animated.Text
        style={[
          styles.infoText,
          {
            transform: [
              { translateY: translateAnim },
              { scale: textScale },
            ],
          },
        ]}
      >
        {displayShort ? shortText : text}
      </Animated.Text>
      <Animated.Text style={[styles.arrow, { transform: [{ rotate: arrowRotation }] }]}>
        ▲
      </Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "#fbc737ff",
    borderWidth: 2,
    backgroundColor: "#fff7e6ff",
    marginHorizontal: scale(10),
    marginVertical: scale(10),
    padding: scale(10),
    alignItems: "center",
    flexDirection: "row",
  },
  infoText: {
    color: "black",
    fontSize: scale(12),
    textAlign: "center",
  },
  arrow: {
    fontSize: scale(10),
    color: "#fbc737ff",
    marginTop: scale(4),
    position: "absolute",
    right: scale(10),
    top: scale(10),
  },
});