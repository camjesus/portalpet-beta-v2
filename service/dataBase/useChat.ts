import { db} from "../../FirebaseConfig";
import { collection, where, query, getDocs, orderBy, addDoc } from "firebase/firestore";
import { Chat, ChatId } from "@/models/Chat";
import { dataToChatMap } from "../mapping/useMapping";
import { MessageId } from "@/models/Message";
import { findMessagesAsync } from "./useMessage";
import { PetId } from "@/models/Pet";
import { User } from "@/models/User";
import { getUserAsync } from "../storeData/useUser";

//public
export const loadChatAsync = async (petObj: PetId, full:boolean = true) => {
    let messages : MessageId[] = [];
    let newDoc : ChatId ;
    const user = await getUserAsync();
    const chat = await findChatAsync(petObj, user);

    if(chat?.id && user?.id && full)
    {
        await findMessagesAsync(chat?.id, user?.id).then((data) => {
            messages = data;
        });
    }else{
        newDoc =  await newChatAsync(petObj, user);
    }
    
    return {chat: newDoc ? newDoc : chat, messages: messages, user: user}
}

//private
const findChatAsync =  async (petObj: PetId, user:User) => {
    const {pet} = petObj;
    let chat : ChatId;

    const q = query(collection(db, "chats"), 
              where("rescuer.id", "==", pet.rescuerId),
              where("user.id", "==", user.id),
              where("pet.id", "==", petObj.petId),
              orderBy("createDate", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc != null) {
            chat = dataToChatMap(doc.id, doc.data())
        }
    }
);

return chat;
}

const newChatAsync = async (petObj: PetId, user:User) => {
    const {pet} = petObj;

    const newChat : Chat = {
        createDate: new Date(),
        user: {
            id: user.id,
            name: user.name
        },
        rescuer: {
            id: pet.rescuer?.id,
            name: pet.rescuer?.name
        },
        pet: {
            id: petObj.petId,
            name: pet.name,
            image: pet.image
        },
        required: false 
    }
    const newDoc = await addDoc(collection(db, "chats"), newChat);
    
    return dataToChatMap(newDoc.id, newChat);
}

