import { db } from "../../FirebaseConfig";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { getCurrentUser } from "@/services/storage/userStorage";
import { disablePet } from "@/features/pet/services/petService";
import { Report } from "@/models";
import { dataToReportMap } from "../mapping/useMapping";

//public
export const reportPetAsync = async (report: Report) => {
  const user = await getCurrentUser();

  try {
    var result = await findReportByPetId(report.idPet);

    if (!result.reports.find((r) => r.idReporter === user.id)) {
      if (result.size == 2) {
        report.idReporter = user.id;
        await addDoc(collection(db, "report"), report);
        disablePet(report.idPet);
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
