import { db } from "@/FirebaseConfig";
import {
  collection,
  where,
  query,
  getDocs,
  orderBy,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import { Chat, ChatId } from "@/models";
import { mapChatFromFirestore } from "../mappers/chatMapper";

export const addChatAsync = async (newChat: Chat) => {
  const newDoc = await addDoc(collection(db, "chats"), newChat);
  return mapChatFromFirestore(newDoc.id, newChat);
};

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
    if (doc) {
      chat = mapChatFromFirestore(doc.id, doc.data());
    }
  });

  return chat;
}

export const getChatDocAsync = async (id: string) => {
  const chatRef = doc(db, "chats", id);
  const chatDoc = await getDoc(chatRef);

  return mapChatFromFirestore(chatDoc.id, chatDoc.data());
};
