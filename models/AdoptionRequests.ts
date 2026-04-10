export interface AdoptionRequest {
  userId: string;
  petId: string;
  rescuerId: string;
  adoptionProfileId: string;
  chatId: string;
  userName?: string;
  userLastName?: string;
  userImage?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "adapting" | "adopted";
  createdAt: Date;
  adaptationStartDate?: Date | null;
}

export interface AdoptionRequestId extends AdoptionRequest {
  id: string;
}