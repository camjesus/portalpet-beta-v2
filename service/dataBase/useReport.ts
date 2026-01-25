import { db } from "../../FirebaseConfig";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { getUserAsync } from "@/service/storeData/useUser";
import { disablePetAsync } from "./usePet";
import { Report } from "@/models";
import { dataToReportMap } from "../mapping/useMapping";

//public
export const reportPetAsync = async (report: Report) => {
  const user = await getUserAsync();

  try {
    var result = await findReportByPetId(report.idPet);

    if (!result.reports.find((r) => r.idReporter === user.id)) {
      if (result.size == 2) {
        report.idReporter = user.id;
        await addDoc(collection(db, "report"), report);
        disablePetAsync(report.idPet);
      }
    }
  } catch (error) {
    throw Error("error DataBase: UseReport: reportPetAsync" + error);
  }
};

//private
async function findReportByPetId(petId: string) {
  var reports: Report[] = [];

  const q = query(
    collection(db, "report"),
    where("idPet", "==", petId),
    orderBy("createDate", "desc"),
  );

  const result = await getDocs(q);
  result.forEach((doc) => {
    if (doc != null) {
      reports.push(dataToReportMap(doc.data()));
    }
  });
  return { reports: reports, size: result.size };
}
