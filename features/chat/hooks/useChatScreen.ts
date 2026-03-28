import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { resolveChat } from "@/features/chat/services/chatService";
import {
  sendMessage,
  sendAdoptionMessage,
  sendAdoptionAcceptedMessage,
  sendAdoptionRejectedMessage,
} from "@/features/chat/services/messageService";
import {
  getAdoptionProfile,
  sendAdoptionRequest,
  getAdoptionRequestByPet,
  updateAdoptionRequestStatus,
} from "@/features/adoption/services/adoptionService";
import { ChatId, User, PetId, AdoptionProfile, Validation } from "@/models";
import { FIELD_VALIDATION } from "@/constants/Validations";

export function useChatScreen() {
  const { chatId, petString } = useLocalSearchParams<{
    chatId: string;
    petString: string;
  }>();

  const [chat, setChat] = useState<ChatId>();
  const [user, setUser] = useState<User>();
  const [showModal, setShowModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [adoptionProfile, setAdoptionProfile] = useState<AdoptionProfile | null>(null);
  const [adoptionRequestId, setAdoptionRequestId] = useState<string | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation>();

  const pendingAdoption = useRef(false);
  const setActiveChatId = useAuthStore((s) => s.setActiveChatId);

  const isMine = chat?.chat.rescuer?.id === user?.id;
  const isNotMine = chat?.chat.user?.id === user?.id;
  const title = isMine ? chat?.chat.user?.name : chat?.chat.rescuer?.name;

  const petParse = useMemo(() => {
    return petString ? (JSON.parse(petString) as PetId) : undefined;
  }, [petString]);

  // Resolver chat inicial
  useEffect(() => {
    if (!petParse && !chatId) return;
    resolveChat(chatId, petParse?.pet, petParse?.id).then((res) => {
      if (res) {
        setChat(res.chat);
        setUser(res.user);
      }
    });
  }, [chatId, petParse]);

  // Solicitud de adopción pendiente
  useEffect(() => {
    if (!chat?.chat.pet.id || !isMine) return;
    getAdoptionRequestByPet(chat.chat.pet.id).then((request) => {
      setHasPendingRequest(!!request);
    });
  }, [chat, isMine]);

  // Marcar chat como activo
  useFocusEffect(
    useCallback(() => {
      if (chat?.id) setActiveChatId(chat.id);
      return () => setActiveChatId(null);
    }, [chat?.id]),
  );

  // Retomar adopción pendiente al volver de adoptionProfile
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

    const result = await sendAdoptionRequest(
      user.id,
      chat.chat.pet.id,
      chat.chat.rescuer.id,
      chat.id,
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
    if (!chat) return;
    try {
      const isNewChat = chat.id === "";
      const res = await sendMessage(chat, message, user);
      if (isNewChat && res?.chat?.id) setChat({ ...res.chat });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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

  return {
    chat, setChat, user, title, isMine, isNotMine,
    hasPendingRequest, adoptionProfile,
    showModal, setShowModal,
    showRequestModal, setShowRequestModal,
    toast, setToast, toastConfig,
    handleSendMessage, handleAdoptionRequest,
    handleOpenRequest, handleAccept, handleReject,
  };
}