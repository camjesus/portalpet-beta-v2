import { ChatId } from "@/models/Chat";
import { MessageId } from "@/models/Message";
import { PetId } from "@/models/Pet";

export function dataToChatMap(id:string, data:any){
    const chat : ChatId = {
        id: id,
        chat: data
    };
    return chat;
}

export function dataToPetMap(id:string, data:any){
    const newPet : PetId = {
        petId: id,
        pet: data
    };
    return newPet;
}

export function dataToMessageMap(id:string, message:any){
    const newMessage : MessageId = {
        id: id,
        bubbleUser: false,
        system: false,
        message: message
    };
    return newMessage;
}