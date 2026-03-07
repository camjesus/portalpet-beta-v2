import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import { MessageId, ChatId, User, PetId } from "@/models";
import { ViewCustom, HeaderCustom, IconSymbol } from "@/components/ui";
import { resolveChat } from "@/features/chat/services/chatService";
import {
  listenMessages,
  sendMessage,
} from "@/features/chat/services/messageService";
import { Bubble, InputMessage } from "@/components/chat";

export default function Chat() {
  const { chatId, petString } = useLocalSearchParams<{
    chatId: string;
    petString: string;
  }>();
  const [messages, setMessages] = useState<MessageId[]>([]);
  const [chat, setChat] = useState<ChatId>();
  const [user, setUser] = useState<User>();
  const scrollViewRef = useRef<ScrollView>(null);
  console.log("chat" + chat);
  const title =
    chat?.chat.rescuer?.id === user?.id
      ? chat?.chat.user?.name
      : chat?.chat.rescuer?.name;

  const petParse = useMemo(() => {
    return petString ? (JSON.parse(petString) as PetId) : undefined;
  }, [petString]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    if (chat?.id) {
      const unsubscribe = listenMessages(chat.id, (msgs) => {
        setMessages(msgs);
        requestAnimationFrame(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [chat?.id]);

  function goToBack() {
    router.back();
  }

  const sendMessageAsync = async (message: string) => {
    if (chat) {
      try {
        const isNewChat = chat.id === "";
        const res = await sendMessage(chat, message, user);

        if (isNewChat && res?.chat?.id) {
          setChat({ ...res.chat });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    if (!petParse && !chatId) return;

    resolveChat(chatId, petParse?.pet, petParse?.id).then((res) => {
      if (res) {
        setChat(res.chat);
        setUser(res.user);
      }
    });
  }, [chatId, petParse]);

  return (
    <ViewCustom>
      <HeaderCustom
        title={title}
        childrenLeft={
          <Pressable onPress={goToBack}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
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

        <View style={styles.footer}>
          <InputMessage sendMessage={sendMessageAsync} />
        </View>
      </KeyboardAvoidingView>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  footer: {
    margin: scale(2),
    right: 0,
    bottom: 0,
  },
  flatList: {
    marginHorizontal: scale(10),
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
