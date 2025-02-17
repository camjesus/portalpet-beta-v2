import { StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import ViewCustom from "@/components/ViewCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import InputMessage from "./components/InputMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadChatAsync } from "@/service/dataBase/useChat";
import { MessageId } from "@/models/Message";
import { ChatId } from "@/models/Chat";
import { newMessageAsync } from "@/service/dataBase/useMessage";
import Bubble from "./components/Bubble";
import { scale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import { User } from "@/models/User";

export default function PetProfile() {
  const [messages, setMessages] = useState<MessageId[]>([]);
  const [chat, setChat] = useState<ChatId>();
  const [user, setUser] = useState<User>();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Espera a que el componente se monte y luego se desplaza al final
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const { stringItem } = useLocalSearchParams<{
    stringItem: string;
  }>();
  const petId = JSON.parse(stringItem);

  function goToBack() {
    router.push({ pathname: "/(tabs)" });
  }

  function sendMessage(message: string) {
    saveMessageAsync(message);
  }

  const getChatAsync = async () => {
    await loadChatAsync(petId).then((res) => {
      setMessages(res.messages);
      setChat(res.chat);
      setUser(res.user);
    });
  };

  const saveMessageAsync = async (message: string) => {
    if (chat) {
      await newMessageAsync(chat.id, message, messages).then((res) => {
        setMessages(res.messages);
      });
    }
  };

  useEffect(() => {
    if (!chat) {
      getChatAsync();
    }
  }, [chat]);

  return (
    <ViewCustom>
      <HeaderCustom
        title="Chat"
        childrenLeft={
          <Pressable onPress={goToBack}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <SafeAreaView style={{ flex: 1, marginBottom: scale(60) }}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          style={styles.flatList}>
          {messages.map((item) => (
            <Bubble
              key={item.id}
              item={item}
              userId={user?.id ? user?.id : ""}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.footer}>
        <InputMessage sendMessage={sendMessage} />
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  footer: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  flatList: {
    marginHorizontal: scale(20),
  },
  leftIcon: {
    alignSelf: "flex-start",
    marginTop: scale(2),
  },
  rightIcon: {
    alignSelf: "flex-end",
    marginTop: scale(2),
  },
  text: {
    fontSize: scale(13),
  },
});
