import { Timestamp } from "firebase/firestore";

export type MessageId = {
    id: string;
    system: boolean | false;
    bubbleUser: boolean | true;
    message: Message;
}


export type Message = {
    createAt: Timestamp | undefined;
    chatId: string | undefined;
    text: string;
    sender: {
        id: string;
        name: string;
    }| undefined;
    
}

export function newSystemMessageId(index:string, text: string)
{
    const newSystem : MessageId = {
        id: index,
        system: true,
        bubbleUser: false,
        message: {
            text: text,
            createAt: Timestamp.now(),
            chatId: index,
            sender: undefined
        }
    }
    return newSystem;
}