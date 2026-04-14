import { useState, useEffect } from "react";
import { toggleLike, isLiked } from "@/services/storage/likesStorage";
import { PetWithDistance } from "@/models";

export function useLike(item: PetWithDistance, onUnlike?: (id: string) => void) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    isLiked(item.id).then(setLiked);
  }, [item.id]);

  const handleLike = async () => {
    const newLiked = await toggleLike(item.id);
    setLiked(newLiked);
    if (!newLiked) onUnlike?.(item.id);
  };

  return { liked, handleLike };
}