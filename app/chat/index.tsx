import React, { useRef, useState } from "react";
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
  AdoptionBanner,
  ChatMenu,
} from "@/components/chat";
import { useChatScreen } from "@/features/chat/hooks/useChatScreen";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";

export default function Chat() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false); 
  const {
    chat,
    user,
    title,
    isMine,
    isNotMine,
    hasPendingRequest,
    adoptionProfile,
    myAdoptionProfile, showMyRequestModal, setShowMyRequestModal,
    showPreviewModal, setShowPreviewModal, handleConfirmSendRequest,
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
    handleCancelRequest,
    userDeletedAt,
    handleViewPetProfile,
    handleDeleteChat,
    handleViewContactProfile,
  } = useChatScreen();

  const { messages } = useChatMessages(chat?.id, scrollViewRef, userDeletedAt);
  if (!title) return null;

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
          <ChatMenu
            items={[
              { label: "Ver perfil de mascota", icon: "paw", onPress: handleViewPetProfile },
              { label: "Ver perfil de contacto", icon: "account", onPress: handleViewContactProfile },
              { label: "Eliminar chat", icon: "delete", onPress: handleDeleteChat, danger: true },
            ]}
          />
        }
      />
      <AdoptionBanner
        isMine={isMine}
        isNotMine={isNotMine}
        hasPendingRequest={hasPendingRequest}
        isPending={chat?.chat.adoptionStatus === "pending"}
        onOpenRequest={handleOpenRequest}
        onSendRequest={() => setShowModal(true)}
        onViewMyRequest={() => setShowMyRequestModal(true)}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
        <ScrollView ref={scrollViewRef} style={styles.flatList}
          onScroll={(e) => {                                    
            const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
            const distanceFromBottom = contentSize.height - contentOffset.y - layoutMeasurement.height;
            setShowScrollButton(distanceFromBottom > 100);
          }}
          scrollEventThrottle={16}  >
          {messages.map((item) => (
            <Bubble key={item.id} item={item} userId={user?.id ?? ""} />
          ))}
        </ScrollView>
        {showScrollButton && (
          <Pressable
            style={styles.scrollButton}
            onPress={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
            <IconSymbol name="chevron-down" size={20} color="white" />
          </Pressable>
        )}
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
      <AdoptionRequestModal
        visible={showMyRequestModal}
        profile={myAdoptionProfile}
        onClose={() => setShowMyRequestModal(false)}
        onCancel={handleCancelRequest}
        readOnly
      />
      <AdoptionRequestModal
        visible={showPreviewModal}
        profile={myAdoptionProfile}
        onClose={() => setShowPreviewModal(false)}
        onConfirmSend={handleConfirmSendRequest}
        readOnly
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
  scrollButton: {
  position: "absolute",
  bottom: scale(70),
  alignSelf: "center",
  backgroundColor: "#ffb13d",
  borderRadius: 20,
  padding: scale(8),
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
});
