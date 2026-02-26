import { db } from "../../FirebaseConfig";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  orderBy,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { dataToMessageIdMap } from "../mapping/useMapping";
import { MessageId, Message, newSystemMessageId } from "@/models";
import { capitalize, formatTimestampToDate } from "../utils/useUtil";

//public
export const newMessageAsync = async (message: Message) => {
  const newDoc = await addDoc(collection(db, "messages"), message);
  return dataToMessageIdMap(newDoc.id, message);
};

export const findMessagesAsync = async (id: string) => {
  var messages: MessageId[] = [];
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", id),
    orderBy("createAt", "asc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc != null) {
      messages.push(dataToMessageIdMap(doc.id, doc.data()));
    }
  });

  messages = addSystemMessage(messages);
  return messages;
};

export const listenMessages = (
  chatId: string,
  callback: (messages: MessageId[]) => void,
) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("createAt", "asc"),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    var messages: MessageId[] = snapshot.docs.map((doc) =>
      dataToMessageIdMap(doc.id, doc.data()),
    );
    console.log("mensajito");
    messages = addSystemMessage(messages);
    callback(messages);
  });
  console.log("ENTRA?");
  return unsubscribe;
};

//private
function addSystemMessage(messages: MessageId[]) {
  const dateToday = new Date();
  let newMessages: MessageId[] = [];
  let lastUser: string = "";

  messages.forEach((message, index) => {
    let dateAt = formatTimestampToDate(message.message?.createAt);
    const isYesterday = dateAt?.getDate() == dateToday.getDate() - 1;
    const senderId =
      message.message?.sender !== null && message.message?.sender !== undefined
        ? message.message?.sender?.id
        : "";
    message.bubbleUser = lastUser === senderId ? false : true;

    if (index === 0) {
      message.bubbleUser = true;
      lastUser = senderId;
    }

    if (isYesterday) {
      if (!newMessages.find((m) => existMessage(m, "Ayer"))) {
        newMessages.push(newSystemMessageId(index.toString(), "Ayer"));
      }
    }

    if (dateAt?.toDateString() !== dateToday.toDateString() && !isYesterday) {
      const textDate = formatDate(dateAt);
      if (!newMessages.find((m) => existMessage(m, textDate))) {
        newMessages.push(newSystemMessageId(index.toString(), textDate));
      }
    }

    lastUser = senderId;
    newMessages.push(message);
  });

  return newMessages;
}

function existMessage(message: MessageId, text: string) {
  return message?.message?.text === text;
}

function formatDate(createAt: Date | undefined) {
  const dateToday = new Date();
  let options: Intl.DateTimeFormatOptions = {};
  let diffDays =
    createAt !== undefined
      ? dateToday.getUTCDate() - createAt?.getUTCDate()
      : 0;
  let textDate = "";

  if (diffDays >= 7) {
    options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
  } else {
    options = {
      weekday: "long",
    };
  }
  textDate = createAt ? createAt?.toLocaleDateString("es-ES", options) : "";

  return capitalize(textDate);
}
