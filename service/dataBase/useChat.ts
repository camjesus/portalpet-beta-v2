import { db} from "../../FirebaseConfig";
import { collection, where, query, getDocs, orderBy, addDoc, doc, getDoc } from "firebase/firestore";
import { Chat, ChatId } from "@/models/Chat";
import { dataToChatMap } from "../mapping/useMapping";
import { MessageId } from "@/models/Message";
import { findMessagesAsync } from "./useMessage";
import { PetId } from "@/models/Pet";
import { User } from "@/models/User";
import { getUserAsync } from "../storeData/useUser";

//public
export const loadChatAsync = async (petObj: PetId) => {
    let messages : MessageId[] = [];
    let newDoc : ChatId | undefined;
    const user = await getUserAsync();
    const chat = await findChatAsync(petObj, user);

    if(chat?.id && user?.id)
    {
        await findMessagesAsync(chat?.id, user?.id).then((data) => {
            messages = data;
        });
    }else{
        newDoc =  await newChatAsync(petObj, user);
    }
    
    return {chat: newDoc ? newDoc : chat, messages: messages, user: user}
}

export const getChatsAsync =  async () => {
    let chats : ChatId[] = [];
    const user = await getUserAsync();
    const myQuestions = await myQuestionsAsync(user?.id !== null ? user?.id : "")
    const questionsAboutMyPets = await questionsAboutMyPetsAsync(user?.id !== null ? user?.id : "")
    chats = chats.concat(myQuestions);
    chats = chats.concat(questionsAboutMyPets);
    return {chats:chats, user: user};
}

//private
const findChatAsync =  async (petObj: PetId, user:User) => {
    const {pet} = petObj;
    let chat : ChatId | undefined;

    const q = query(collection(db, "chats"), 
              //where("rescuer.id", "==", pet.rescuerId),
              where("rescuer.id", "==", "0dede6e5-504c-4f46-8339-9d6280a693b0"),
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
            image: pet.image,
            action: pet.action
        },
        required: false 
    }
    const newDoc = await addDoc(collection(db, "chats"), newChat);

    return dataToChatMap(newDoc.id, newChat);
}

 const myQuestionsAsync =  async (userId:string) => {
    let myQuestions : ChatId[] = [];
    const q = query(collection(db, "chats"), 
              where("user.id", "==", userId),
              orderBy("createDate", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc != null) {
            myQuestions.push(dataToChatMap(doc.id, doc.data()))
        }
    })

    return myQuestions;
}

const questionsAboutMyPetsAsync =  async (userId:string) => {
    let questionsAboutMyPets : ChatId[] = [];
    const q = query(collection(db, "chats"), 
              where("rescuer.id", "==", userId),
              orderBy("createDate", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc != null) {
            questionsAboutMyPets.push(dataToChatMap(doc.id, doc.data()))
        }
    })

    return questionsAboutMyPets;
}

export const getChatById =  async (id:string) => {
    let messages : MessageId[] = [];
    const user = await getUserAsync();
    const chatId = doc(db, "chats", id);
    const chatDoc = await getDoc(chatId);
    const chat = dataToChatMap(chatDoc.id, chatDoc.data())
console.log("chatDoc.id", chatDoc.id);
    if(chat?.id && user?.id)
    {
        await findMessagesAsync(chat?.id, user?.id).then((data) => {
            messages = data;
        });
    }
    return {chat: chat, messages: messages, user: user}
}
