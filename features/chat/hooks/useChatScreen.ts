import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { resolveChat } from "@/features/chat/services/chatService";
import {
  sendMessage,
  sendAdoptionMessage,
  sendAdoptionAcceptedMessage,
  sendAdoptionRejectedMessage,
  sendAdoptionCancelledMessage,
} from "@/features/chat/services/messageService";
import {
  getAdoptionProfile,
  sendAdoptionRequest,
  getAdoptionRequestByPet,
  updateAdoptionRequestStatus,
  cancelAdoptionRequest,
} from "@/features/adoption/services/adoptionService";
import { getPetById } from "@/features/pet/services/petService";
import { ChatId, User, PetId, AdoptionProfile, Validation } from "@/models";
import { FIELD_VALIDATION } from "@/constants/Validations";
import { markChatAsRead, listenChatDoc, softDeleteChat } from "@/features/chat/repository/chatRepository";
import { getAdoptionRequestByChatId } from "@/features/adoption/repository/AdoptionRepository";

export function useChatScreen() {
  const { chatId, petString, profileSaved } = useLocalSearchParams<{
  chatId: string;
  petString: string;
  profileSaved: string;
  }>();

  const [chat, setChat] = useState<ChatId>();
  const [user, setUser] = useState<User>();
  const [showModal, setShowModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [adoptionProfile, setAdoptionProfile] = useState<AdoptionProfile | null>(null);
  const [adoptionRequestId, setAdoptionRequestId] = useState<string | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [myAdoptionProfile, setMyAdoptionProfile] = useState<AdoptionProfile | null>(null);
  const [showMyRequestModal, setShowMyRequestModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation>();

  const setActiveChatId = useAuthStore((s) => s.setActiveChatId);

  const isMine = chat?.chat.rescuer?.id === user?.id;
  const isNotMine = chat?.chat.user?.id === user?.id;
  const title = isMine ? chat?.chat.user?.name : chat?.chat.rescuer?.name;

  const petParse = useMemo(() => {
    return petString ? (JSON.parse(petString) as PetId) : undefined;
  }, [petString]);

  useEffect(() => {
  if (profileSaved === "true" && chat && user) {
    triggerAdoptionRequest();
  }
}, [profileSaved, chat]);

  // Resolve chat
  useEffect(() => {
    if (!petParse && !chatId) return;
    resolveChat(chatId, petParse?.pet, petParse?.id).then((res) => {
      if (res) {
        setChat(res.chat);
        setUser(res.user);
        if (res.chat?.id) setActiveChatId(res.chat.id);
      }
    });
  }, [chatId, petParse]);

  // Listen to chat document changes in real-time
  useEffect(() => {
    if (!chat?.id) return;
    const unsub = listenChatDoc(chat.id, (updated) => {
      setChat(updated);
    });
    return unsub;
  }, [chat?.id]);

  // Rescuer: check for pending adoption request
  useEffect(() => {
    if (!chat?.chat.pet.id || !isMine) return;
    getAdoptionRequestByPet(chat.chat.pet.id).then((request) => {
      setHasPendingRequest(!!request);
    });
  }, [chat, isMine]);

  // Adopter: load own profile when request is pending
  useEffect(() => {
    if (!isNotMine || !user?.id || chat?.chat.adoptionStatus !== "pending") return;
    getAdoptionProfile(user.id).then(setMyAdoptionProfile);
  }, [isNotMine, user?.id, chat?.chat.adoptionStatus]);

  // Mark chat as active
  useFocusEffect(
    useCallback(() => {
      if (chat?.id) setActiveChatId(chat.id);
      
      return () => setActiveChatId(null);
    }, [chat?.id]),
  );

  const triggerAdoptionRequest = async () => {
    if (!user?.id || !chat) return;
    const profile = await getAdoptionProfile(user.id);

    if (!profile) {
      router.push({
        pathname: "/adoptionProfile",
        params: { fromChat: "true", chatId: chat.id },
      });
      return;
    }

    setMyAdoptionProfile(profile);
    setShowPreviewModal(true);
  };

  const handleConfirmSendRequest = async () => {
    if (!user?.id || !chat) return;
    setShowPreviewModal(false);

    const result = await sendAdoptionRequest(
      user.id,
      chat.chat.pet.id,
      chat.chat.rescuer.id,
      chat.id,
      user.name,
      user.lastname,
      user.image,
    );

    if (result === "already_sent") {
      setToastConfig(FIELD_VALIDATION("Ya enviaste una solicitud para esta mascota"));
      setToast(true);
    } else {
      await sendAdoptionMessage(chat, user);
    }
  };

  const handleAdoptionRequest = async () => {
    setShowModal(false);
    await triggerAdoptionRequest();
  };

  const handleSendMessage = async (message: string) => {
    if (!chat || message.trim() === "") return;
    try {
      const isNewChat = chat.id === "";
      const res = await sendMessage(chat, message, user);
      if (isNewChat && res?.chat?.id) setChat({ ...res.chat });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useFocusEffect(
  useCallback(() => {
    if (chat?.id && user?.id) {
      setActiveChatId(chat.id);
      const isRescuer = chat.chat.rescuer?.id === user.id;
      markChatAsRead(chat.id, isRescuer);
    }
    return () => {
      if (chat?.id && user?.id) {
        const isRescuer = chat.chat.rescuer?.id === user.id;
        markChatAsRead(chat.id, isRescuer); 
      }
      setActiveChatId(null);
    };  }, [chat?.id, user?.id]),
);

  const handleOpenRequest = async () => {
    if (!chat?.chat.pet.id) return;
    const request = await getAdoptionRequestByChatId(chat.id);
    if (!request) return;
    setAdoptionRequestId(request.id);
    const profile = await getAdoptionProfile(request.userId);
    setAdoptionProfile(profile);
    setShowRequestModal(true);
  };

  const handleAccept = async () => {
    if (!adoptionRequestId || !chat) return;
    await updateAdoptionRequestStatus(adoptionRequestId, "accepted", chat.id ?? "");
    await sendAdoptionAcceptedMessage(chat, user);
    
    setShowRequestModal(false);
    setHasPendingRequest(false);
  };

  const handleReject = async () => {
    if (!adoptionRequestId || !chat) return;
    await updateAdoptionRequestStatus(adoptionRequestId, "rejected", chat.id ?? "");
    await sendAdoptionRejectedMessage(chat, user);
    setShowRequestModal(false);
    setHasPendingRequest(false);
  };

  const handleCancelRequest = async () => {
    if (!chat?.id || !user?.id) return;
    await cancelAdoptionRequest(user.id, chat.chat.pet.id, chat.id);
    await sendAdoptionCancelledMessage(chat, user);
    setShowMyRequestModal(false);
    setMyAdoptionProfile(null);
  };

  const handleViewPetProfile = async () => {
    if (!chat) return;
    const petDoc = await getPetById(chat.chat.pet.id);
    if (!petDoc) return;
    router.push({
      pathname: "/petProfile",
      params: {
        petId: petDoc.id,
        stringItem: JSON.stringify(petDoc),
        image: encodeURI(petDoc.pet.image),
        isMy: "false",
      },
    });
  };

  const handleDeleteChat = async () => {
    if (!chat?.id || !user?.id) return;
    await softDeleteChat(chat.id, user.id);
    router.back();
  };

  const userDeletedAt = user?.id ? chat?.chat.deletedAt?.[user.id] : undefined;

  return {
    chat, setChat, user, title, isMine, isNotMine,
    userDeletedAt,
    handleViewPetProfile, handleDeleteChat,
    hasPendingRequest, adoptionProfile,
    myAdoptionProfile, showMyRequestModal, setShowMyRequestModal,
    showPreviewModal, setShowPreviewModal, handleConfirmSendRequest,
    showModal, setShowModal,
    showRequestModal, setShowRequestModal,
    toast, setToast, toastConfig,
    handleSendMessage, handleAdoptionRequest,
    handleOpenRequest, handleAccept, handleReject, handleCancelRequest,
  };
}