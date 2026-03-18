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
import { MessageId, ChatId, User, PetId, Validation } from "@/models";
import { ViewCustom, HeaderCustom, IconSymbol, Toast } from "@/components/ui";
import { resolveChat } from "@/features/chat/services/chatService";
import {
  listenMessages,
  sendAdoptionAcceptedMessage,
  sendAdoptionMessage,
  sendAdoptionRejectedMessage,
  sendMessage,
} from "@/features/chat/services/messageService";
import { Bubble, InputMessage } from "@/components/chat";
import { AdoptionModal } from "@/components/chat";
import { getAdoptionProfile } from "@/features/adoption/services/adoptionService";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { sendAdoptionRequest } from "@/features/adoption/services/adoptionService";
import { AdoptionRequestModal } from "@/components/chat";
import {
  getAdoptionRequestByPet,
  updateAdoptionRequestStatus,
} from "@/features/adoption/services/adoptionService";
import { AdoptionProfile } from "@/models";
import { FIELD_VALIDATION } from "@/constants/Validations";

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
  const isNotMine = chat?.chat.user?.id === user?.id;
  const [showModal, setShowModal] = useState(false);
  const pendingAdoption = useRef(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [adoptionProfile, setAdoptionProfile] =
    useState<AdoptionProfile | null>(null);
  const [adoptionRequestId, setAdoptionRequestId] = useState<string | null>(
    null,
  );
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation>();

  const isMine = chat?.chat.rescuer?.id === user?.id;
  useFocusEffect(
    useCallback(() => {
      if (!pendingAdoption.current) return;
      pendingAdoption.current = false;
      triggerAdoptionRequest();
    }, [user, chat]),
  );
  const triggerAdoptionRequest = async () => {
    if (!user?.id || !chat) return;
    const profile = await getAdoptionProfile(user.id);
    if (!profile) {
      pendingAdoption.current = true;
      router.push("/adoptionProfile");
      return;
    }

    const petId = chat.chat.pet.id;
    const rescuerId = chat.chat.rescuer.id;
    const result = await sendAdoptionRequest(user.id, petId, rescuerId);

    if (result === "already_sent") {
      setToastConfig(
        FIELD_VALIDATION("Ya enviaste una solicitud para esta mascota"),
      );
      setToast(true);
    } else {
      await sendAdoptionMessage(chat, user);
    }
  };
  const handleAdoptionRequest = async () => {
    setShowModal(false);
    await triggerAdoptionRequest();
  };
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

  useEffect(() => {
    if (!chat?.chat.pet.id || !isMine) return;
    getAdoptionRequestByPet(chat.chat.pet.id).then((request) => {
      setHasPendingRequest(!!request);
    });
  }, [chat, isMine]);

  const handleOpenRequest = async () => {
    if (!chat?.chat.pet.id) return;
    const request = await getAdoptionRequestByPet(chat.chat.pet.id);
    if (!request) return;
    setAdoptionRequestId(request.id);
    const profile = await getAdoptionProfile(request.userId);
    setAdoptionProfile(profile);
    setShowRequestModal(true);
  };

  const handleAccept = async () => {
    if (!adoptionRequestId || !chat) return;
    await updateAdoptionRequestStatus(adoptionRequestId, "accepted");
    await sendAdoptionAcceptedMessage(chat, user);
    setShowRequestModal(false);
    setHasPendingRequest(false);
  };

  const handleReject = async () => {
    if (!adoptionRequestId || !chat) return;
    await updateAdoptionRequestStatus(adoptionRequestId, "rejected");
    await sendAdoptionRejectedMessage(chat, user);
    setShowRequestModal(false);
    setHasPendingRequest(false);
  };

  return (
    <ViewCustom>
      <HeaderCustom
        title={title}
        childrenLeft={
          <Pressable onPress={goToBack}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
        childrenRight={
          isMine && hasPendingRequest ? (
            <Pressable onPress={handleOpenRequest}>
              <IconSymbol size={30} name="clipboard" color="white" />
            </Pressable>
          ) : isNotMine ? (
            <Pressable onPress={() => setShowModal(true)}>
              <IconSymbol size={30} name="paw" color="white" />
            </Pressable>
          ) : undefined
        }
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
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
        {toast && toastConfig && (
          <Toast validation={toastConfig} setToast={setToast} />
        )}
      </KeyboardAvoidingView>
      <AdoptionModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleAdoptionRequest}
      />
      <AdoptionRequestModal
        visible={showRequestModal}
        profile={adoptionProfile}
        onClose={() => setShowRequestModal(false)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  footer: {},
  flatList: {
    marginHorizontal: scale(10),
    backgroundColor: "transparent",
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
