import { db , storage } from "../FirebaseConfig";
import { collection, addDoc, where, query, getDocs, orderBy } from "firebase/firestore";
import { getUserAsync } from '@/hooks/useStoreData';
import { disablePetAsync } from "./usePetDataBase";
import { Report } from "@/models/Report";

export const reportPetAsync = async (report:Report) => {
    console.log("pasa por reportPetAsync");
    console.log("pasa por reportPetAsync", report);

       const user = await getUserAsync();
       console.log("pasa por user", user);

       try{
        const q = query(collection(db, "report"), 
                    where("idRescuer", "!=", user.uid),
                    where("IdPet", "==", report.idPet), 
                    orderBy("createDate", "desc"));

        const querySnapshot = await getDocs(q);
        console.log("leng", querySnapshot.size);
        //disablePetAsync(report.idPet)
        if(querySnapshot.size == 2)
            {
            disablePetAsync(report.idPet);
            }
            }catch(err){
                console.log("err", err)
                report.idReporter = user.uid;
                const newDoc = await addDoc(collection(db, "report"), report);
                console.log(newDoc);
                console.log("newReport");
            }

       
}