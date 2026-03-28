import { useRef, useState } from "react";
import { Pressable } from "react-native";
import { ViewCustom, Toast, HeaderCustom, IconSymbol } from "@/components/ui";
import { router, useLocalSearchParams } from "expo-router";
import { useFilters } from "@/features/filter/hooks/useFilters";
import { useToast } from "@/hooks/useToast";
import { FilterForm } from "@/components/filter/FilterForm";

export default function Filters() {
  const { stateFilter } = useLocalSearchParams<{ stateFilter: string }>();
  const { state, changeValue, changeFrom, changeUntil, saveAsync } =
    useFilters(stateFilter);
  const { visible, config, showToast, setVisible } = useToast();
  const firstLoad = useRef(true);
  const [search] = useState("no");

  async function handleSave() {
    const { error } = await saveAsync();
    if (error) {
      showToast(error);
    } else {
      router.push({ pathname: "/(tabs)/home", params: { search } });
    }
  }

  return (
    <ViewCustom>
      <HeaderCustom
        title="Filtros"
        childrenLeft={
          <Pressable onPress={handleSave}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <FilterForm
        filter={state.filter}
        changeValue={changeValue}
        changeFrom={changeFrom}
        changeUntil={changeUntil}
        onSave={handleSave}
      />
      {visible && config && <Toast validation={config} setToast={setVisible} />}
    </ViewCustom>
  );
}
