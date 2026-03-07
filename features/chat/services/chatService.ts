import {
  addChatAsync,
  findChatAsync,
  getChatsByUserAsync,
  getChatsByRescuerAsync,
  getChatDocAsync,
} from "../repository/chatRepository";
import { findMessages } from "./messageService";
import { getCurrentUser } from "@/services/storage/userStorage";
import { ChatInfo, ChatId, Pet, MessageId } from "@/models";

export const getChatsAsync = async () => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return { chats: [], user };
  }

  const myQuestions = await getChatsByUserAsync(user.id);
  const questionsAboutMyPets = await getChatsByRescuerAsync(user.id);

  const chats = [...myQuestions, ...questionsAboutMyPets];

  return { chats, user };
};

export const getChatById = async (id: string) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const chat = await getChatDocAsync(id);

  let messages: MessageId[] = [];

  if (chat?.id) {
    messages = await findMessages(chat.id);
  }

  return { chat, messages, user } as ChatInfo;
};

export async function resolveChat(
  chatId: string | undefined,
  pet: Pet | undefined,
  petId: string | undefined,
) {
  const user = await getCurrentUser();
    console.log("user" + user)
  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  if (chatId) {
    return await getChatById(chatId);
  }

  if (!pet || !petId) return;

  const existingChat = await findChatAsync(pet.rescuerId, user.id, petId);

  if (existingChat) {
    const messages = await findMessages(existingChat.id);
    return { chat: existingChat, messages, user } as ChatInfo;
  }

  const baseChat: ChatId = {
    id: "",
    chat: {
      createDate: new Date(),
      user: { id: user.id, name: user.name },
      rescuer: {
        id: pet.rescuer.id,
        name: pet.rescuer.name,
      },
      pet: {
        id: petId,
        name: pet.name,
        image: pet.image,
        action: pet.action,
      },
      required: false,
    },
  };

  return { chat: baseChat, messages: [], user } as ChatInfo;
}