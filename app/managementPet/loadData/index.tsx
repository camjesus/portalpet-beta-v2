import { Link } from "expo-router";
import { ViewCustom, IconSymbol, HeaderCustom, Loading } from "@/components/ui";
import { DataForm } from "@/components/managementPet/DataForm";
import { useLoadData } from "@/features/pet/hooks/useLoadData";

export default function LoadData() {
  const {
    state,
    noName,
    optAcion,
    optSize,
    load,
    toast,
    toastConfig,
    imageSource,
    labelButton,
    scrollViewRef,
    setAcion,
    setSize,
    setToast,
    changeValue,
    changeNoName,
    handleFocus,
    goToImage,
    savePet,
  } = useLoadData();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Nueva mascota"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      {load && <Loading />}
      {!load && (
        <DataForm
          state={state}
          noName={noName}
          optAcion={optAcion}
          optSize={optSize}
          toast={toast}
          toastConfig={toastConfig}
          imageSource={imageSource}
          labelButton={labelButton}
          scrollViewRef={scrollViewRef}
          setAcion={setAcion}
          setSize={setSize}
          setToast={setToast}
          changeValue={changeValue}
          changeNoName={changeNoName}
          handleFocus={handleFocus}
          goToImage={goToImage}
          savePet={savePet}
        />
      )}
    </ViewCustom>
  );
}
