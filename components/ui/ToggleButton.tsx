import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  label: string;
  value: boolean;
  onPress: () => void;
};

export default function ToggleButton({ label, value, onPress }: Props) {
    
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.toggle,
        value ? styles.toggleActive : styles.toggleInactive,
      ]}>
      <Text
        style={[
          styles.toggleText,
          value ? styles.toggleTextActive : styles.toggleTextInactive,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    borderRadius: 20,
    borderWidth: 2,
  },
  toggleActive: {
    backgroundColor: "#ffb13d",
    borderColor: "#ffb13d",
  },
  toggleInactive: {
    backgroundColor: "transparent",
    borderColor: "#A5A5A5",
  },
  toggleText: {
    fontWeight: "bold",
    fontSize: scale(13),
  },
  toggleTextActive: {
    color: "#151718",
  },
  toggleTextInactive: {
    color: "#A5A5A5",
  },
});