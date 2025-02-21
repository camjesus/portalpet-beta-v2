import { Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui/IconSymbol";

type Props = {
  isMyMessage: boolean;
  name: string | undefined;
};

export default function BubbleUser({ isMyMessage, name }: Props) {
  return (
    <View
      style={[
        { flexDirection: "row", gap: scale(10) },
        isMyMessage ? styles.rightIcon : styles.leftIcon,
      ]}>
      {isMyMessage && (
        <Text style={(styles.text, { color: "#A5A5A5" })}>{name}</Text>
      )}
      <IconSymbol
        size={15}
        name="paw"
        color={isMyMessage ? "#A5A5A5" : "#DCAD5F"}
      />
      {!isMyMessage && (
        <Text style={(styles.text, { color: "#DCAD5F" })}>{name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    alignSelf: "flex-start",
    marginTop: scale(10),
  },
  rightIcon: {
    alignSelf: "flex-end",
    marginTop: scale(10),
    marginBottom: scale(2),
  },
  text: {
    fontSize: scale(13),
  },
});
