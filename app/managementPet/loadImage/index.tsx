import { Link } from "expo-router";
import { ViewCustom, IconSymbol, HeaderCustom, Loading } from "@/components/ui";
import { ImageForm } from "@/components/managementPet/ImageForm";
import { useLoadImage } from "@/features/pet/hooks/useLoadImage";

export default function LoadImage() {
  const { pet, uploading, handlePhoto, pickImage, next } = useLoadImage();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Nueva mascota"
        childrenLeft={
          <Link href={"/(tabs)/myPets"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {uploading && <Loading />}
      {!uploading && (
        <ImageForm
          pet={pet}
          handlePhoto={handlePhoto}
          pickImage={pickImage}
          next={next}
        />
      )}
    </ViewCustom>
  );
}
