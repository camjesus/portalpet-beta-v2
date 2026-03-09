import { Chat, PetId } from "@/models";
import { addChatAsync } from "../services/chatRepository";

export async function saveChatAsync(chat: Chat){
    const newChat = await addChatAsync(chat);
    return newChat;
}