import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  message: string;
  title: string;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toast = ({ message, title, setToast }: Props) => {
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
        duration: 8000,
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
    <Animated.View style={[styles.container, { bottom, opacity }]}>
      <Text style={{ fontSize: 25 }}>💬</Text>
      <View style={{ marginLeft: scale(12) }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: scale(30),
    paddingVertical: scale(10),
    backgroundColor: "#555555",
    position: "absolute",
    alignItems: "center",
    borderRadius: 10,
  },
  message: { color: "white", fontSize: scale(15) },
  title: { color: "white", fontWeight: "bold" },
});

export default Toast;
