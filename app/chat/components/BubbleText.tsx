import { Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "react-native-size-matters";
import { Message } from "@/models/Message";
import { getTime } from "@/service/utils/useUtil";
type Props = {
  isMyMessage: boolean;
  message: Message | undefined;
  system: boolean;
};

export default function BubbleText({ isMyMessage, message, system }: Props) {
  const [time, setTime] = useState("");
  function fotmaText() {
    setTime(getTime(message?.createAt));
  }

  useEffect(() => {
    !system && fotmaText();
  }, []);

  return (
    <View>
      {system && (
        <View style={[styles.system]}>
          <Text style={styles.systemText}>{message?.text}</Text>
        </View>
      )}
      {!system && (
        <View
          style={[styles.default, isMyMessage ? styles.right : styles.left]}>
          <Text style={styles.text}>{message?.text}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  systemText: {
    fontSize: scale(10),
    color: "white",
  },
  system: {
    backgroundColor: "#A5A5A5",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    paddingHorizontal: scale(20),
    marginVertical: scale(5),
    paddingVertical: scale(5),
    borderRadius: 15,
  },
  default: {
    flexDirection: "row",
    alignItems: "baseline",
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    borderRadius: 10,
    margin: scale(3),
    gap: scale(10),
  },
  text: {
    color: "white",
    fontSize: scale(13),
  },
  left: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
    marginRight: scale(10),
    backgroundColor: "#DCAD5F",
  },
  right: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
    backgroundColor: "#ffb13d",
    marginLeft: scale(50),
  },
  time: {
    color: "black",
    fontSize: scale(10),
    alignSelf: "flex-end",
  },
  leftIcon: {
    alignSelf: "flex-start",
  },
  rightIcon: {
    alignSelf: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
});
