import { Chat, PetId } from "@/models";
import { addAsync, getChatById } from "../dataBase/useChat";

export async function loadChat(id:string | null, pet: PetId)
{
    console.log("idchat", id);
    if(id)
    {
            console.log("getChatById", id);

        var chatId = await getChatById(id);
        return chatId;
    }else{
            console.log("loadChat", JSON.stringify(pet));

        //var loadChat = await loadChatAsync(pet);
        //return loadChat;
    }
}

export async function saveChatAsync(chat: Chat){
    const newChat = await addAsync(chat);
    return newChat;
}