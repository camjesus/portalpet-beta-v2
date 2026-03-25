export type ChatId = {
    id: string;
    chat: Chat;
};

export type Chat = {
    createDate: Date;
    pet: {
        id: string;
        name: string ;
        image: string ;
        action: string;
    };
    rescuer: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        name: string;
    };
    required: boolean;
    hasUnreadRescuer: boolean;
    hasUnreadUser: boolean; 
    adoptionStatus: "none" | "pending" | "accepted" | "rejected";
};