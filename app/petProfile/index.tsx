import { PetProfileView } from "@/components/petProfile/PetProfileView";
import { usePetProfile } from "@/features/pet/hooks/usePetProfile";

export default function PetProfile() {
  const { pet, image, isMy, rescuer, goToBack, goToReport, goToChat } = usePetProfile();

  return (
    <PetProfileView
      pet={pet}
      image={image}
      isMy={isMy}
      rescuer={rescuer}
      goToBack={goToBack}
      goToReport={goToReport}
      goToChat={goToChat}
    />
  );
}