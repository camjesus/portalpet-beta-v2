export type ChatId = {
    id: string;
    chat: Chat | null;
} | undefined;

export type Chat = {
    createDate: Date | null;
    pet: {
        id: string | null;
        name: string | null;
        image: string | null;
    }| null;
    rescuer: {
        id: string | null | undefined;
        name: string | null| undefined;
    }| null;
    user: {
        id: string | null;
        name: string | null;
    }| null;
    required: boolean| null;
};