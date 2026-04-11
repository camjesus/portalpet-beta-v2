import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AdoptionProfile, AdoptionRequestId, Validation } from "@/models";
import {
  acceptAdoptionRequest,
  getAdoptionRequestsByPet,
  rejectAdoptionRequest,
} from "@/features/adoption/services/adoptionService";
import { FIELD_VALIDATION } from "@/constants/Validations";
import { loadPinnedIds, savePinnedIds } from "@/services/storage/pinnedStorage";

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
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<Validation | null>(null);

  useEffect(() => {
 if (!petId) return;
  Promise.all([
    getAdoptionRequestsByPet(petId),
    loadPinnedIds(petId),
  ]).then(([data, savedPins]) => {
    setIsAdopted(data.some((item) => item.request.status === "adopted"));
    setItems(data.filter((item) => item.request.status === "pending"));
    setPinnedIds(savedPins);

    const accepted = data.find((item) =>
      item.request.status === "accepted" || item.request.status === "adapting"
    ) ?? null;

    const adopted = data.find((item) => item.request.status === "adopted") ?? null;

    setAcceptedRequest(adopted ?? accepted);
    setIsAdopted(!!adopted);

    if (accepted && !adopted) {
      setLoading(false);
      router.replace({ pathname: "/managementAdoption/progress", params: { petId } });
      return;
    }

setLoading(false);
  });
}, [petId]);

const togglePin = (id: string) => {
  setPinnedIds((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    if (petId) savePinnedIds(petId, next);
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
    console.log("selected",selected);

  const result = await acceptAdoptionRequest(selected.request);
  console.log(result);
  if (result === "already_accepted") {
    setToastConfig(FIELD_VALIDATION("Ya aceptaste una solicitud para esta mascota"));
    setToast(true);
    return;
  }
  setItems((prev) => prev.filter((i) => i.request.id !== selected.request.id));
  setAcceptedRequest(selected);
  setSelected(null);
    router.push({ pathname: "/managementAdoption/progress", params: { petId: selected.request.petId } });

};

  const handleReject = async () => {
    if (!selected) return;
    await rejectAdoptionRequest(selected.request);
    setItems((prev) => prev.filter((i) => i.request.id !== selected.request.id));
    setShowModal(false);
    setSelected(null);
    setReadOnly(false); 
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
    readOnly,
    toast,
    toastConfig,
    setToast,
  };
}

