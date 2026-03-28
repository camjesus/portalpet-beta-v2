import React, { useRef } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import { ViewCustom, HeaderCustom, IconSymbol, Toast } from "@/components/ui";
import {
  Bubble,
  InputMessage,
  AdoptionModal,
  AdoptionRequestModal,
} from "@/components/chat";
import { useChatScreen } from "@/features/chat/hooks/useChatScreen";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";

export default function Chat() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {
    chat,
    user,
    title,
    isMine,
    isNotMine,
    hasPendingRequest,
    adoptionProfile,
    showModal,
    setShowModal,
    showRequestModal,
    setShowRequestModal,
    toast,
    setToast,
    toastConfig,
    handleSendMessage,
    handleAdoptionRequest,
    handleOpenRequest,
    handleAccept,
    handleReject,
  } = useChatScreen();

  const { messages } = useChatMessages(chat?.id, scrollViewRef);

  return (
    <ViewCustom>
      <HeaderCustom
        title={title}
        childrenLeft={
          <Pressable onPress={() => router.back()}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
        childrenRight={
          isMine && hasPendingRequest ? (
            <Pressable onPress={handleOpenRequest}>
              <IconSymbol
                size={30}
                name="clipboard-clock-outline"
                color="white"
              />
            </Pressable>
          ) : isNotMine ? (
            <Pressable onPress={() => setShowModal(true)}>
              <IconSymbol
                size={30}
                name="clipboard-arrow-up-outline"
                color="white"
              />
            </Pressable>
          ) : undefined
        }
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
        <ScrollView ref={scrollViewRef} style={styles.flatList}>
          {messages.map((item) => (
            <Bubble key={item.id} item={item} userId={user?.id ?? ""} />
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <InputMessage sendMessage={handleSendMessage} />
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
});
