import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffb13d",
        headerShown: false,
        //tabBarButton: HapticTab,
        //tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
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
          title: "Mis mascotas",
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
            <IconSymbol size={28} name="chat" color={color} />
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
