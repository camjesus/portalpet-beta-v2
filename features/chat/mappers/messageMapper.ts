import { MessageId, Message } from "@/models";

export function mapMessageFromFirestore(id: string, data: any): MessageId {
  return {
    id,
    bubbleUser: false,
    system: false,
    message: mapMessage(data),
  };
}

export function mapMessage(data: any): Message {
  return {
    createAt: data.createAt,
    chatId: data.chatId,
    text: data.text,
    sender: {
      id: data.sender.id,
      name: data.sender.name,
    },
    type: data.type
  };
}