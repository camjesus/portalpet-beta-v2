import { MessageId, newSystemMessageId } from "@/models";
import { capitalize, formatTimestampToDate } from "@/services/utils/useUtil";

export function addSystemMessage(messages: MessageId[]) {
  const dateToday = new Date();
  let newMessages: MessageId[] = [];
  let lastUser: string = "";

  messages.forEach((message, index) => {
    let dateAt = formatTimestampToDate(message.message?.createAt);

    const senderId = message.message?.sender?.id ?? "";
    message.bubbleUser = lastUser === senderId ? false : true;

    if (index === 0) {
      message.bubbleUser = true;
    }

    const isYesterday = dateAt?.getDate() === dateToday.getDate() - 1;

    if (isYesterday) {
      if (!newMessages.find((m) => m?.message?.text === "Ayer")) {
        newMessages.push(newSystemMessageId(index.toString(), "Ayer"));
      }
    }

    if (dateAt?.toDateString() !== dateToday.toDateString() && !isYesterday) {
      const textDate = formatDate(dateAt);

      if (!newMessages.find((m) => m?.message?.text === textDate)) {
        newMessages.push(newSystemMessageId(index.toString(), textDate));
      }
    }

    lastUser = senderId;
    newMessages.push(message);
  });

  return newMessages;
}

function formatDate(createAt: Date | undefined) {
  const dateToday = new Date();

  const diffDays =
    createAt !== undefined
      ? dateToday.getUTCDate() - createAt.getUTCDate()
      : 0;

  const options: Intl.DateTimeFormatOptions =
    diffDays >= 7
      ? { weekday: "long", month: "long", day: "numeric" }
      : { weekday: "long" };

  const textDate = createAt
    ? createAt.toLocaleDateString("es-ES", options)
    : "";

  return capitalize(textDate);
}