import { ChatId } from "@/models/Chat";
import { MessageId } from "@/models/Message";
import { PetId } from "@/models/Pet";
import { Report } from "@/models/Report";

export function dataToChatMap(id: string, data: any) {
  const chat: ChatId = {
    id: id,
    chat: data,
  };
  return chat;
}

export function dataToPetMap(id: string, pet: any) {
  const newPet: PetId = {
    id: id,
    pet: pet,
  };
  return newPet;
}

export function dataToMessageMap(id: string, message: any) {
  const newMessage: MessageId = {
    id: id,
    bubbleUser: false,
    system: false,
    message: message,
  };
  console.log(id, message);
  return newMessage;
}

export function dataToReportMap(dataReport: any) {
  const report: Report = {
    idPet: dataReport.idPet,
    idReporter: dataReport.idReporter,
    option: dataReport.option,
    description: dataReport.description,
    createDate: dataReport.createDate,
  };
  return report;
}
