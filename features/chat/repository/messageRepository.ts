import { db } from "@/FirebaseConfig";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Message } from "@/models";

export const createMessage = async (message: Message) => {
  const newDoc = await addDoc(collection(db, "messages"), message);
  return { id: newDoc.id, ...message };
};

export const getMessagesByChat = async (chatId: string) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("createAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const subscribeMessages = (
  chatId: string,
  callback: (docs: any[]) => void
) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("createAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
};