import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { AdoptionProfile, AdoptionRequestId } from "@/models";
import { getAdoptionRequestsByPet } from "@/features/adoption/services/adoptionService";

type RequestWithProfile = {
  request: AdoptionRequestId;
  profile: AdoptionProfile | null;
};

export function useManagementAdoptionProgress() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [acceptedRequest, setAcceptedRequest] = useState<RequestWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<RequestWithProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    if (!petId) return;
    getAdoptionRequestsByPet(petId).then((data) => {
      setAcceptedRequest(
        data.find((item) =>
          item.request.status === "accepted" || item.request.status === "adapting"
        ) ?? null
      );
      setLoading(false);
    });
  }, [petId]);

  const handleOpenModal = (item: RequestWithProfile, readOnly = false) => {
    setSelected(item);
    setReadOnly(readOnly);
    setShowModal(true);
  };

  return {
    acceptedRequest,
    loading,
    selected,
    showModal,
    setShowModal,
    handleOpenModal,
    readOnly,
  };
}