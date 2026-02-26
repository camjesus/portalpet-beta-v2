import { ChatId, Message, MessageId, PetId, User } from "@/models";
import { Timestamp } from "firebase/firestore";
import { newMessageAsync } from "../dataBase/useMessage";
import { saveChatAsync } from "../chat/chatActions";

export const sendMessageAsync = async (
  chat: ChatId,
  text: string,
  user: User | undefined,
) => {

  if (chat.id === "") {
    const newChat = await saveChatAsync(chat.chat);
    chat.id = newChat.id;
  }
  const userId = user?.id ? user.id : "";
  const newMessage: Message = {
    createAt: Timestamp.now(),
    text: text,
    chatId: chat.id,
    sender: {
      id: userId,
      name: user?.name ? user.name : "",
    },
  };
    console.log("el chat a guardarchat", chat)

   const newDoc = await newMessageAsync(newMessage);
  return {chat: chat, lastMessage: newDoc};
};
