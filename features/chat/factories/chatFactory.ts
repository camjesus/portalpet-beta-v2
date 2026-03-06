import { ChatId, PetId, User } from "@/models";

export function createChat(petObj: PetId, user: User): ChatId {
  const { pet } = petObj;

  return {
    id: "",
    chat: {
      createDate: new Date(),
      user: {
        id: user.id,
        name: user.name,
      },
      rescuer: {
        id: pet.rescuer?.id,
        name: pet.rescuer?.name,
      },
      pet: {
        id: petObj.id,
        name: pet.name,
        image: pet.image,
        action: pet.action,
      },
      required: false,
    },
  };
}