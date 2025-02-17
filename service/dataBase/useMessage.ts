import { db } from "../../FirebaseConfig";
import { collection, addDoc, where, query, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { dataToMessageMap } from "../mapping/useMapping";
import { MessageId, Message, newSystemMessageId } from "@/models/Message";
import { getUserAsync } from "../storeData/useUser";
import { capitalize, formatTimestampToDate } from "../utils/useUtil";

//public
export const newMessageAsync = async (chatId:string, text:string, messages:MessageId[]) => {
    const user = await getUserAsync();
    const userId = user.id ? user.id : "";
    const newMessage : Message = {
        createAt: Timestamp.now(),
        text: text,
        chatId: chatId,
        sender: {
            id: userId,
            name: user.name ? user.name : ""
        }
    }
    await addDoc(collection(db, "messages"), newMessage);
    messages = await findMessagesAsync(chatId, userId);
    return {messages: messages};
}

export const findMessagesAsync =  async (id:string, userId:string) => {
    let messages : MessageId[] = [];
    const q = query(collection(db, "messages"), 
              where("chatId", "==", id),
              orderBy("createAt", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc != null) {
            messages.push(dataToMessageMap(doc.id, doc.data()));
        }
    });

    messages = addSystemMessage(messages, userId);
    return messages;
}

//private
function addSystemMessage(messages: MessageId[], userId:string)
{
    const dateToday = new Date();
    let newMessages : MessageId[] = [];
    let lastUser : string = "";
    let isfirst : string = "";

    messages.forEach((message, index) => {
        let dateAt = formatTimestampToDate(message.message?.createAt);
        const isYesterday = dateAt?.getDate() == dateToday.getDate() - 1;
        const senderId = message.message?.sender !== null && message.message?.sender !== undefined ? message.message?.sender?.id : "";
        message.bubbleUser = lastUser === senderId ? false : true;

        if(index === 0)
        {
            message.bubbleUser = true;
            lastUser = senderId;
        }

        if(isYesterday){
            if(!newMessages.find((m) => existMessage(m,"Ayer")))
            {
                newMessages.push(newSystemMessageId(index, "Ayer"));
            }
        }

        if(dateAt?.toDateString() !== dateToday.toDateString() && !isYesterday)
        {
            const textDate = formatDate(dateAt);
            if(!newMessages.find((m) => existMessage(m,textDate)))
            {
                newMessages.push(newSystemMessageId(index, textDate));
            }
        }

        lastUser = senderId;
        newMessages.push(message);
    })

    return newMessages;
}

function existMessage(message: MessageId, text:string) {
    return message?.message?.text === text;
  }


function formatDate(createAt:Date | undefined)
{
    const dateToday = new Date();
    let options: Intl.DateTimeFormatOptions ={};
    let diffDays = createAt !== undefined ? dateToday.getUTCDate() - createAt?.getUTCDate() : 0; 
    let textDate = "";

    if(diffDays >= 7)
    {
        options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    }else {
        options = {
        weekday: "long",
        };
    }
    textDate = createAt ? createAt?.toLocaleDateString('es-ES', options) : "";

    return capitalize(textDate);
}