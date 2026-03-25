import {
  addChatAsync,
  findChatAsync,
  getChatDocAsync,
} from "../repository/chatRepository";
import { findMessages } from "./messageService";
import { getCurrentUser } from "@/services/storage/userStorage";
import { ChatInfo, ChatId, Pet, MessageId } from "@/models";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { mapChatFromFirestore } from "../mappers/chatMapper";
import { db } from "@/FirebaseConfig";

export const getChatsAsync = async (
  onUpdate: (chats: ChatId[]) => void
) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return { chats: [], user, unsub: () => {} };
  }

  let userChats: ChatId[] = [];
  let rescuerChats: ChatId[] = [];

  const merge = () => {
    onUpdate([...userChats, ...rescuerChats]);
  };

  const qUser = query(
    collection(db, "chats"),
    where("user.id", "==", user.id),
    orderBy("createDate", "asc")
  );

  const qRescuer = query(
    collection(db, "chats"),
    where("rescuer.id", "==", user.id),
    orderBy("createDate", "asc")
  );

  const unsubUser = onSnapshot(qUser, (snapshot) => {
    userChats = snapshot.docs.map((doc) => mapChatFromFirestore(doc.id, doc.data()));
    merge();
  });

  const unsubRescuer = onSnapshot(qRescuer, (snapshot) => {
    rescuerChats = snapshot.docs.map((doc) => mapChatFromFirestore(doc.id, doc.data()));
    merge();
  });

  return {  
    chats: [...userChats, ...rescuerChats],
    user,
    unsub: () => {
      unsubUser();
      unsubRescuer();
    },
  };
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
      hasUnreadRescuer: false,
      hasUnreadUser: false,
      adoptionStatus: "none"
    },
  };

  return { chat: baseChat, messages: [], user } as ChatInfo;
}