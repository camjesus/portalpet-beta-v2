import { Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { IconSymbol } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { useGlobalChatListener } from "@/hooks/useGlobalChatListener";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  const pathname = usePathname();
  const userId = useAuthStore((s) => s.user?.id);
  const { hasUnreadGlobal } = useGlobalChatListener({ userId });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffb13d",
        headerShown: false,
        tabBarStyle: pathname === "/" ? { display: "none" } : { backgroundColor: "white" },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myPets"
        options={{
          title: "Publicaciones",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paw" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatList"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <View>
              <IconSymbol size={28} name="chat" color={color} />
              {hasUnreadGlobal && (
                <View style={styles.dot} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Guardados",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Cuenta",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f95748",
    position: "absolute",
    top: 0,
    right: 0,
  },
});