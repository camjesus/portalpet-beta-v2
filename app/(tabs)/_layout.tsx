import { Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { IconSymbol } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { useGlobalChatListener } from "@/hooks/useGlobalChatListener";

export default function TabLayout() {
  const pathname = usePathname();
  const userId = useAuthStore((s) => s.user?.id);
  const activeChatId = useAuthStore((s) => s.activeChatId);

  useGlobalChatListener({ userId, activeChatId });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffb13d",
        headerShown: false,
        //tabBarButton: HapticTab,
        tabBarStyle: pathname === "/" ? { display: "none" } : {},
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
