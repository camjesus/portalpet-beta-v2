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
                  pressed && styles.itemPressed
                ]}
                onPress={() => handlePress(item.onPress)}>
                <IconSymbol
                  name={item.icon}
                  size={18}
                  color={item.danger ? "#E57373" : "#A5A5A5"}
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
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    minWidth: scale(200),
    overflow: "hidden",
    gap: scale(4),
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
  },
  itemPressed: {
    backgroundColor: "rgba(255,177,61,0.1)",
  },
  itemText: {
    flex: 1,
    fontSize: scale(13),
    color: "#151718",
  },
  itemTextDanger: {
    color: "#E57373",
  },
});
