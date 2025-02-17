import { Pressable, StyleSheet, View } from "react-native";
import ViewCustom from "@/components/ViewCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { useReducer, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import Button from "@/components/ui/Button";
import FilterType from "./components/FilterType";
import { filterReducer, ACTION } from "@/hooks/reducers/useFilter";
import FilterSize from "./components/FilterSize";
import FilterSex from "./components/FilterSex";
import FilterAge from "./components/FilterAge";
import { saveFilterAsync } from "@/service/storeData/useFilter";

export default function Filters() {
  const { stateFilter } = useLocalSearchParams<{
    stateFilter: string;
  }>();
  const [state, dispatch] = useReducer(filterReducer, JSON.parse(stateFilter));
  //console.log("Filters: state: ", state);
  const [search, setSearch] = useState("no");
  function changeValue(value: any, field: string) {
    setSearch("yes");
    dispatch({
      type: ACTION.CHANGE_FILTER,
      payload: {
        field: field,
        value: value,
      },
    });
  }

  const saveFilter = async () => {
    console.log("entro a ", state.filter);
    await saveFilterAsync(JSON.stringify(state.filter)).then(() => {
      router.push({
        pathname: "../",
        params: { search: search },
      });
    });
  };

  function goTosearch() {
    saveFilter();
  }
  return (
    <ViewCustom>
      <HeaderCustom
        title="Filtros"
        childrenLeft={
          <Pressable onPress={goTosearch}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <View style={styles.container}>
        <View style={[styles.row, { gap: scale(50) }]}>
          <FilterType type={state.filter.type} changeValue={changeValue} />
          <FilterSex sex={state.filter.sex} changeValue={changeValue} />
        </View>
        <View style={[styles.row, { gap: scale(5) }]}>
          <FilterSize size={state.filter.size} changeValue={changeValue} />
        </View>
        <View style={styles.age}>
          <FilterAge
            ageFrom={state.filter.ageFrom}
            ageTo={state.filter.ageTo}
            type={state.filter.ageType}
            changeValue={changeValue}
          />
        </View>
        <View style={styles.submit}>
          <Button label="Guardar" onPress={goTosearch} />
        </View>
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  submit: {
    marginBottom: scale(16),
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  containerCenter: {
    alignItems: "center",
    marginTop: scale(16),
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginTop: scale(16),
  },
  container: {
    flex: 1,
    marginTop: scale(16),
    gap: scale(20),
  },
  age: {
    marginHorizontal: scale(20),
    marginTop: scale(16),
  },
});
