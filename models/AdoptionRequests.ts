export interface AdoptionRequest
{
  userId: string,
  petId: string,
  rescuerId: string,
  adoptionProfileId: string,
  status: "pending" | "accepted" | "rejected" | "cancelled",
  createdAt: Date,
}