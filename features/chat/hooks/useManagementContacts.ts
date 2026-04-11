import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getChatsByPetId } from "@/features/chat/repository/chatRepository";
import { ChatId } from "@/models";
import { finalizePet } from "@/features/pet/services/petService";
import { useMyPetsStore } from "@/store/myPetsStore";

export function useManagementContacts() {
  const { petId, action } = useLocalSearchParams<{ petId: string; action: string }>();
  const [chats, setChats] = useState<ChatId[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFinished, setIsFinished] = useState(action === "FOUNDED" || action === "DELIVERED");

  useEffect(() => {
    if (!petId) return;
    getChatsByPetId(petId).then((data) => {
      setChats(data);
      setLoading(false);
    });
  }, [petId]);

  const finalStatus = action === "WANTED" ? "FOUNDED" : "DELIVERED";
  const buttonLabel = action === "WANTED" ? "¡La encontré!" : "La entregué al dueño";

  const handleFinalize = async () => {
    if (!petId) return;
    await finalizePet(petId, finalStatus);
    useMyPetsStore.getState().invalidate();
    setIsFinished(true);
  };

  return {
    chats,
    loading,
    showConfirm,
    setShowConfirm,
    buttonLabel,
    handleFinalize,
    isFinished
  };
}