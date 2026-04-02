export interface AdoptionRequest {
  userId: string;
  petId: string;
  rescuerId: string;
  adoptionProfileId: string;
  chatId: string;
  userName?: string;
  userImage?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: Date;
}

export interface AdoptionRequestId extends AdoptionRequest {
  id: string;
}