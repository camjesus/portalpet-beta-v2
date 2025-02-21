export type ChatId = {
    id: string;
    chat: Chat;
};

export type Chat = {
    createDate: Date | null;
    pet: {
        id: string | null;
        name: string | null;
        image: string | null;
        action: string;
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