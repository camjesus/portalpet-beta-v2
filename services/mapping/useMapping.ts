import { ChatId , Report, MessageId, PetId, Message} from "@/models";



export function dataToPetMap(id: string, pet: any) {
  const newPet: PetId = {
    id: id,
    pet: pet,
  };
  return newPet;
}

export function dataToMessageIdMap(id: string, message: any) {
  const newMessage: MessageId = {
    id: id,
    bubbleUser: false,
    system: false,
    message: dataToMessageMap(message),
  };
  return newMessage;
}

function dataToMessageMap(message: any) {
  const newMessage: Message = {
   createAt: message.createAt,
       chatId: message.chatId,
       text: message.text,
       sender: {
           id: message.sender.id,
           name: message.sender.name
       }
  };
  console.log(message.sender);
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

export function paramToPetId(param: string)
{
  const obj = JSON.parse(param);
  return dataToPetMap(obj.id, obj);
}