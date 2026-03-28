import { Link } from "expo-router";
import { HeaderCustom, IconSymbol, Loading, ViewCustom } from "@/components/ui";
import { LocationForm } from "@/components/managementPet/LocationForm";
import { useLoadLocation } from "@/features/pet/hooks/useLoadLocation";

export default function LoadLocationLayout() {
  const {
    coords,
    setCoords,
    address,
    setAddress,
    suggestions,
    setSuggestions,
    search,
    saveCoords,
    handleAddressChange,
  } = useLoadLocation();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Ubicación"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {!coords && <Loading />}
      {coords && (
        <LocationForm
          coords={coords}
          address={address}
          suggestions={suggestions}
          search={search}
          setCoords={setCoords}
          setAddress={setAddress}
          setSuggestions={setSuggestions}
          handleAddressChange={handleAddressChange}
          saveCoords={saveCoords}
        />
      )}
    </ViewCustom>
  );
}
