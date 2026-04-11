import {
  createMessage,
  getMessagesByChat,
  subscribeMessages,
} from "../repository/messageRepository";
import { mapMessageFromFirestore } from "../mappers/messageMapper";
import { ChatId, Message, MessageId, User } from "@/models";
import { addSystemMessage } from "../utils/messageUtils";
import { addChatAsync, markChatAsUnread, updateLastMessageAt } from "../repository/chatRepository";
import { Timestamp } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import { getAdoptionRequestByPetId } from "@/features/adoption/repository/AdoptionRepository";

export const sendMessage = async (
  chat: ChatId,
  text: string,
  user: User | undefined
) => {

  if (!chat.id) {
    const newChat = await addChatAsync(chat.chat);
    chat.id = newChat.id;
  }
  const message: Message = {
    createAt: Timestamp.now(),
    text,
    chatId: chat.id,
    sender: {
      id: user?.id ?? "",
      name: user?.name ?? "",
    },
  };

  const doc = await createMessage(message);
  const isRescuer = user?.id === chat.chat.rescuer.id;
  await Promise.all([
    markChatAsUnread(chat.id, !isRescuer),
    updateLastMessageAt(chat.id),
  ]);
  
  return {
    chat,
    lastMessage: mapMessageFromFirestore(doc.id, message),
  };
};

export const findMessages = async (chatId: string) => {
  const docs = await getMessagesByChat(chatId);

  let messages: MessageId[] = docs.map((doc) =>
    mapMessageFromFirestore(doc.id, doc)
  );
  messages = addSystemMessage(messages);

  return messages;
};

export const listenMessages = (
  chatId: string,
  callback: (messages: MessageId[]) => void
) => {
  return subscribeMessages(chatId, (docs) => {
    let messages: MessageId[] = docs.map((doc) =>
      mapMessageFromFirestore(doc.id, doc)
    );

    messages = addSystemMessage(messages);
    callback(messages);
  });
};

export const sendAdoptionMessage = async (
  chat: ChatId,
  user: User | undefined
) => {
  if (!chat.id) {
    const newChat = await addChatAsync(chat.chat);
    chat.id = newChat.id;
  }

  const message: Message = {
    createAt: Timestamp.now(),
    text: "Solicitud de adopción enviada",
    chatId: chat.id,
    type: "adoption_request",
    sender: {
      id: user?.id ?? "",
      name: user?.name ?? "",
    },
  };

  const doc = await createMessage(message);
  return { chat, lastMessage: mapMessageFromFirestore(doc.id, message) };
};

export const sendAdoptionAcceptedMessage = async (
  chat: ChatId,
  user: User | undefined
) => {
  const message: Message = {
    createAt: Timestamp.now(),
    text: "Solicitud de adopción aceptada",
    chatId: chat.id,
    type: "adoption_accepted",
    sender: { id: user?.id ?? "", name: user?.name ?? "" },
  };
  const doc = await createMessage(message);
  return { chat, lastMessage: mapMessageFromFirestore(doc.id, message) };
};

export const sendAdoptionRejectedMessage = async (
  chat: ChatId,
  user: User | undefined
) => {
  const message: Message = {
    createAt: Timestamp.now(),
    text: "Solicitud de adopción rechazada",
    chatId: chat.id,
    type: "adoption_rejected",
    sender: { id: user?.id ?? "", name: user?.name ?? "" },
  };
  const doc = await createMessage(message);
  return { chat, lastMessage: mapMessageFromFirestore(doc.id, message) };
};

export const sendAdoptionCancelledMessage = async (
  chat: ChatId,
  user: User | undefined
) => {
  const message: Message = {
    createAt: Timestamp.now(),
    text: "Solicitud de adopción cancelada",
    chatId: chat.id,
    type: "adoption_cancelled",
    sender: { id: user?.id ?? "", name: user?.name ?? "" },
  };
  const doc = await createMessage(message);
  return { chat, lastMessage: mapMessageFromFirestore(doc.id, message) };
};

export const sendPetInAdaptationNotification = async (petId: string) => {
  const requests = await getAdoptionRequestByPetId(petId);
  if (!requests) return;

  await Promise.all(
    requests.map(async (request) => {
      console.log("sendPetInAdaptationNotification", request.chatId);
      const message: Message = {
        createAt: Timestamp.now(),
        text: `La mascota está en proceso de adaptación.\nSi querés seguir en lista de espera, no canceles tu solicitud.\nTe avisaremos si hay novedades 🐾`, 
        chatId: request.chatId,
        type: "system",
        sender: { id: "", name: "Portal Pet" },
      };
      await createMessage(message);
    })
  );
};


export const sendPetAdoptedNotification = async (petId: string) => {
  const requests = await getAdoptionRequestByPetId(petId);
  if (!requests) return;

  await Promise.all(
    requests.map(async (request) => {
      console.log("sendPetAdoptedNotification", request.chatId);
      const message: Message = {
        createAt: Timestamp.now(),
        text: "🏠 ¡Esta mascota ya encontró un nuevo hogar!\nPodés seguir buscando tu compañero ideal en Portal Pet 🐾",
        chatId: request.chatId,
        type: "system",
        sender: { id: "", name: "Portal Pet" },
      };
      await createMessage(message);
    })
  );
};

export const sendPetAdoptionCancelledNotification = async (petId: string) => {
  const requests = await getAdoptionRequestByPetId(petId);
  if (!requests) return;

  await Promise.all(
    requests.map(async (request) => {
      console.log("sendPetAdoptionCancelledNotification", request.chatId);
      const message: Message = {
        createAt: Timestamp.now(),
        text: "¡La mascota volvió a estar en adopción! 🐾\nSi querés adoptarla, tu solicitud sigue en lista de espera.\nExpresa tu interés.",
        chatId: request.chatId,
        type: "system",
        sender: { id: "", name: "Portal Pet" },
      };
      await createMessage(message);
    })
  );
};