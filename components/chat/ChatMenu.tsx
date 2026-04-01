import React, { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";

type MenuItem = {
  label: string;
  icon: string;
  onPress: () => void;
  danger?: boolean;
};

type Props = {
  items: MenuItem[];
};

export function ChatMenu({ items }: Props) {
  const [visible, setVisible] = useState(false);

  const handlePress = (onPress: () => void) => {
    setVisible(false);
    onPress();
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.trigger, pressed && { opacity: 0.6 }]}
        onPress={() => setVisible(true)}>
        <IconSymbol name="dots-vertical" size={26} color="white" />
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            {items.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                  index < items.length - 1 && styles.itemBorder,
                ]}
                onPress={() => handlePress(item.onPress)}>
                <IconSymbol
                  name={item.icon}
                  size={18}
                  color={item.danger ? "#E57373" : "#D0D0D0"}
                />
                <Text style={[styles.itemText, item.danger && styles.itemTextDanger]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    padding: scale(4),
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: scale(90),
    paddingRight: scale(12),
  },
  menu: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    minWidth: scale(200),
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
  },
  itemPressed: {
    backgroundColor: "#2A2A2A",
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  itemText: {
    color: "#D0D0D0",
    fontSize: scale(14),
  },
  itemTextDanger: {
    color: "#E57373",
  },
});
