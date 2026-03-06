import { ChatId } from "@/models";

export function mapChatFromFirestore(id: string, data: any): ChatId {
  return {
     id: id,
    chat: data,
  };
}