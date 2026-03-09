import {
  createMessage,
  getMessagesByChat,
  subscribeMessages,
} from "../repository/messageRepository";
import { mapMessageFromFirestore } from "../mappers/messageMapper";
import { ChatId, Message, MessageId, User } from "@/models";
import { addSystemMessage } from "../utils/messageUtils";
import { addChatAsync } from "./chatRepository";
import { Timestamp } from "firebase/firestore";

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