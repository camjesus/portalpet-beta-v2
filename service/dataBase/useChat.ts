import { db } from "../../FirebaseConfig";
import {
  collection,
  where,
  query,
  getDocs,
  orderBy,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Chat, ChatId, User, PetId, MessageId, ChatInfo, Pet } from "@/models";
import { dataToChatMap } from "../mapping/useMapping";
import { findMessagesAsync } from "./useMessage";
import { getUserAsync } from "../storeData/useUser";

//public
export const getChatsAsync = async () => {
  let chats: ChatId[] = [];
  const user = await getUserAsync();
  const myQuestions = await myQuestionsAsync(user?.id !== null ? user?.id : "");
  const questionsAboutMyPets = await questionsAboutMyPetsAsync(
    user?.id !== null ? user?.id : "",
  );
  chats = chats.concat(myQuestions);
  chats = chats.concat(questionsAboutMyPets);
  return { chats: chats, user: user };
};

export const addAsync = async (newChat: Chat) => {
  const newDoc = await addDoc(collection(db, "chats"), newChat);
  return dataToChatMap(newDoc.id, newChat);
};

//private
export const findChatAsync = async (
  rescuerId: string,
  userId: string,
  petId: string,
) => {
  let chat: ChatId | undefined;

  const q = query(
    collection(db, "chats"),
    where("rescuer.id", "==", rescuerId),
    where("user.id", "==", userId),
    where("pet.id", "==", petId),
    orderBy("createDate", "desc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc != null) {
      chat = dataToChatMap(doc.id, doc.data());
    }
  });
 console.log("findChatAsync", chat)
  return chat;
};

const newChat = (petObj: PetId, user: User) => {
  const { pet } = petObj;
  const newChat: ChatId = {
    id: "",
    chat: {
      createDate: new Date(),
      user: {
        id: user.id,
        name: user.name,
      },
      rescuer: {
        id: pet.rescuer?.id,
        name: pet.rescuer?.name,
      },
      pet: {
        id: petObj.id,
        name: pet.name,
        image: pet.image,
        action: pet.action,
      },
      required: false,
    },
  };
  //const newDoc = await addDoc(collection(db, "chats"), newChat);

  return newChat;
};

const myQuestionsAsync = async (userId: string) => {
  let myQuestions: ChatId[] = [];
  const q = query(
    collection(db, "chats"),
    where("user.id", "==", userId),
    orderBy("createDate", "asc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc != null) {
      myQuestions.push(dataToChatMap(doc.id, doc.data()));
    }
  });

  return myQuestions;
};

const questionsAboutMyPetsAsync = async (userId: string) => {
  let questionsAboutMyPets: ChatId[] = [];
  const q = query(
    collection(db, "chats"),
    where("rescuer.id", "==", userId),
    orderBy("createDate", "asc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc != null) {
      questionsAboutMyPets.push(dataToChatMap(doc.id, doc.data()));
    }
  });

  return questionsAboutMyPets;
};

export const getChatById = async (id: string) => {
  let messages: MessageId[] = [];
  const user = await getUserAsync();
  const chatId = doc(db, "chats", id);
  const chatDoc = await getDoc(chatId);
  const chat = dataToChatMap(chatDoc.id, chatDoc.data());
  console.log("chatDoc.id", chatDoc.id);
  if (chat?.id && user?.id) {
    messages = await findMessagesAsync(chat?.id);
  }
  return { chat: chat, messages: messages, user: user } as ChatInfo;
};

export async function resolveChat(chatId: string | undefined, pet: Pet | undefined, petId: string | undefined) {
  const user = await getUserAsync();

  // 1️⃣ Si viene chatId → directo
  if (chatId) {
    return await getChatById(chatId);
  }

    if(!pet || !petId) return;

  // 2️⃣ Buscar chat existente por pet + user
  const existingChat = await findChatAsync(pet.rescuerId, user.id, petId);

  if (existingChat) {
    const messages = await findMessagesAsync(existingChat.id);
    return { chat: existingChat, messages, user } as ChatInfo;
  }

  // 3️⃣ Crear chat BASE (no persistido)
  const baseChat: ChatId = {
    id: "", // 👈 CLAVE
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
