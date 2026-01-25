import { Timestamp } from "firebase/firestore";

export type MessageId = {
    id: string;
    system: boolean | false;
    bubbleUser: boolean | true;
    message: Message | undefined;
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

export function newSystemMessageId(index:number, text: string)
{
    const newSystem : MessageId = {
        id: index.toString(),
        system: true,
        bubbleUser: false,
        message: {
            text: text,
            createAt: Timestamp.now(),
            chatId: index.toString(),
            sender: undefined
        }
    }
    return newSystem;
}