import { useEffect, useState } from "react";
import { startAdaptation, cancelAdaptation, finishAdaptation, cancelAdoption, rejectAdoptionRequest } from "@/features/adoption/services/adoptionService";
import { AdoptionRequestId, AdoptionProfile } from "@/models";
import { formatDate } from "@/components/petProfile/petProfileUtils";
import { router } from "expo-router";

const ADAPTATION_DAYS = 30;

type RequestWithProfile = {
  request: AdoptionRequestId;
  profile: AdoptionProfile | null;
};

export function useAdoptionProgress(acceptedRequest: RequestWithProfile) {
  const { request } = acceptedRequest;
  const [startDate, setStartDate] = useState<Date | null>(
    request.adaptationStartDate ?? null
  );
  const [isAdopted, setIsAdopted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const toDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (value?.seconds) return new Date(value.seconds * 1000); // Firestore Timestamp
    return new Date(value);
  };

  const daysElapsed = startDate
    ? Math.min(
        Math.floor((Date.now() - (toDate(startDate)?.getTime() ?? 0)) / (1000 * 60 * 60 * 24)),
        ADAPTATION_DAYS
      )
    : 0;

  useEffect(() => {
    if (daysElapsed >= ADAPTATION_DAYS) {
      setIsFinished(true);
    }
  }, [daysElapsed]);

  const handleStart = async () => {
    await startAdaptation(request.id, request.petId);
    setStartDate(new Date());
  };

  const handleCancel = async () => {
    await cancelAdaptation(request.id, request.petId);
    setStartDate(null);
  };

  const handleFinish = async () => {
    await finishAdaptation(request.id, request.petId, request.userId);
    setIsAdopted(true);
  };

  const handleCancelAdoption = async () => {
    await cancelAdoption(request);
    router.back();
  };

  return {
    startDate,
    daysElapsed,
    isAdopted,
    isFinished,
    date: startDate ? formatDate(startDate) : "Aún no ha comenzado",
    handleStart,
    handleCancel,
    handleFinish,
    handleCancelAdoption,
  };
}