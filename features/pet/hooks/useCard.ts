import { useState } from "react";
import { router } from "expo-router";
import { loadPet } from "@/services/utils/usePet";
import { PetId } from "@/models";
import { ActionType, ROUTE_BY_ACTION } from "@/constants/StaticData";

export function useCard(item: PetId, onDelete: (id: string) => void) {
  const [showDelete, setShowDelete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const data = loadPet(item.pet);

function handlePress() {
  if (showDelete) {
    setShowDelete(false);
    return;
  }

    const route = ROUTE_BY_ACTION[item.pet.action as ActionType];
    if (route) {
      router.push({ pathname: route as any, params: { petId: item.id , action: item.pet.action} });
    }
  }

  function handleLongPress() {
    setShowDelete(true);
  }

  function handleDeletePress() {
    setShowConfirm(true);
  }

  function handleConfirmDelete() {
    onDelete(item.id);
    setShowConfirm(false);
    setShowDelete(false);
  }

  function handleCancelDelete() {
    setShowConfirm(false);
    setShowDelete(false);
  }

  return {
    data,
    showDelete,
    showConfirm,
    handlePress,
    handleLongPress,
    handleDeletePress,
    handleConfirmDelete,
    handleCancelDelete,
  };
}