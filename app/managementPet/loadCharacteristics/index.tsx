import { Link } from "expo-router";
import { ViewCustom, IconSymbol, HeaderCustom, Loading } from "@/components/ui";
import { CharacteristicsForm } from "@/components/managementPet/CharacteristicsForm";
import { useLoadCharacteristics } from "@/features/pet/hooks/useLoadCharacteristics";

export default function LoadCharacteristics() {
  const {
    goodWithKids, setGoodWithKids,
    goodWithDogs, setGoodWithDogs,
    goodWithCats, setGoodWithCats,
    load,
    save,
  } = useLoadCharacteristics();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Características"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {load && <Loading />}
      {!load && (
        <CharacteristicsForm
          goodWithKids={goodWithKids} setGoodWithKids={setGoodWithKids}
          goodWithDogs={goodWithDogs} setGoodWithDogs={setGoodWithDogs}
          goodWithCats={goodWithCats} setGoodWithCats={setGoodWithCats}
          onSave={save}
        />
      )}
    </ViewCustom>
  );
}
