import { db } from "../../FirebaseConfig";
import { collection, addDoc, where, query, getDocs, orderBy } from "firebase/firestore";
import { getUserAsync } from '@/service/storeData/useUser';
import { disablePetAsync } from "./usePet";
import { Report } from "@/models/Report";

export const reportPetAsync = async (report:Report) => {
    const user = await getUserAsync();
    report.idReporter = user.uid;
    
    try{
        const q = query(collection(db, "report"), 
                    where("idRescuer", "!=", user.uid),
                    where("IdPet", "==", report.idPet), 
                    orderBy("createDate", "desc"));

        const querySnapshot = await getDocs(q);

        if(querySnapshot.size == 2){
            disablePetAsync(report.idPet);
        }else{
            await addDoc(collection(db, "report"), report);
        }
    }catch(error){
        throw Error("error DataBase: UseReport: reportPetAsync" + error);
    }   
}