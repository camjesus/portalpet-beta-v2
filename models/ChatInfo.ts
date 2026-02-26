import { User , MessageId, ChatId} from "./";

export type ChatInfo = {
    chat: ChatId;
    messages: MessageId[];
    user: User;
};