import { Pressable, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { useEffect, useReducer, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import Button from "@/components/ui/Button";
import FilterType from "./components/FilterType";
import { filterReducer, ACTION } from "@/hooks/useFilterReducer";
import FilterSize from "./components/FilterSize";
import FilterSex from "./components/FilterSex";
import FilterAge from "./components/FilterAge";

export default function Filters() {
  const { stateFilter } = useLocalSearchParams<{
    stateFilter: string;
  }>();
  const [state, dispatch] = useReducer(filterReducer, JSON.parse(stateFilter));
  console.log("lo que llega a filter", state);
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

  function goTosearch() {
    router.push({
      pathname: "../",
      params: { search: "yes", stateFilter: JSON.stringify(state) },
    });
  }
  return (
    <ParallaxScrollView>
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
    </ParallaxScrollView>
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
