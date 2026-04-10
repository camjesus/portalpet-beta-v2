import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { AdoptionProfile, AdoptionRequestId } from "@/models";
import {
  getAdoptionRequestsByPet,
  updateAdoptionRequestStatus,
} from "@/features/adoption/services/adoptionService";
import {
  sendAdoptionAcceptedMessage,
  sendAdoptionRejectedMessage,
  sendPetInAdaptationNotification,
} from "@/features/chat/services/messageService";
import { getChatDocAsync } from "@/features/chat/repository/chatRepository";

type RequestWithProfile = {
  request: AdoptionRequestId;
  profile: AdoptionProfile | null;
};

export function useManagementAdoption() {
  const { petId } = useLocalSearchParams<{ petId: string }>();

  const [items, setItems] = useState<RequestWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<RequestWithProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [acceptedRequest, setAcceptedRequest] = useState<RequestWithProfile | null>(null);
  const [isAdopted, setIsAdopted] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    if (!petId) return;
    getAdoptionRequestsByPet(petId).then((data) => {
      setIsAdopted(data.some((item) => item.request.status === "adopted"));
      setItems(data.filter((item) => item.request.status === "pending"));
      setAcceptedRequest(data.find((item) => item.request.status === "accepted" || item.request.status === "adapting") ?? null);
      setLoading(false);
    });
  }, [petId]);

  const togglePin = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sortedItems = [...items].sort((a, b) => {
    const aPinned = pinnedIds.has(a.request.id) ? 0 : 1;
    const bPinned = pinnedIds.has(b.request.id) ? 0 : 1;
    return aPinned - bPinned;
  });

  const handleOpenModal = (item: RequestWithProfile, readOnly = false) => {
    setSelected(item);
    setReadOnly(readOnly);
    setShowModal(true);
  };

  const handleAccept = async () => {
    if (!selected) return;
    setShowModal(false);
    const { request } = selected;
    await updateAdoptionRequestStatus(request.id, "accepted", request.chatId);
    const chat = await getChatDocAsync(request.chatId);
    if (chat) await sendAdoptionAcceptedMessage(chat, undefined);
    await sendPetInAdaptationNotification(request.petId);
    setItems((prev) => prev.filter((i) => i.request.id !== request.id));
    setAcceptedRequest(selected);
  };

  const handleReject = async () => {
    if (!selected) return;
    const { request } = selected;
    await updateAdoptionRequestStatus(request.id, "rejected", request.chatId);
    const chat = await getChatDocAsync(request.chatId);
    if (chat) await sendAdoptionRejectedMessage(chat, undefined);
    setItems((prev) => prev.filter((i) => i.request.id !== request.id));
    setShowModal(false);
    setSelected(null);
  };

  return {
    items: sortedItems,
    loading,
    selected,
    showModal,
    setShowModal,
    pinnedIds,
    togglePin,
    handleOpenModal,
    handleAccept,
    handleReject,
    acceptedRequest, 
    isAdopted,
    readOnly
  };
}
