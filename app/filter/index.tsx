import { useEffect, useReducer, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  ViewCustom,
  Toast,
  InputAge,
  Button,
  HeaderCustom,
  IconSymbol,
} from "@/components/ui";
import { router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import { filterReducer } from "@/hooks/reducers/useFilter";
import { FilterSex, FilterSize, FilterType } from "@/components/filter";
import { filterActions } from "@/service/filter/filterActions";
import { Validation } from "@/models";

export default function Filters() {
  const { stateFilter } = useLocalSearchParams<{
    stateFilter: string;
  }>();
  const [state, dispatch] = useReducer(filterReducer, JSON.parse(stateFilter));
  const [search, setSearch] = useState("no");
  const firstLoad = useRef(true);
  const [toast, setToast] = useState(false);

  const [toastConfig, setToastConfig] = useState<Validation>();

  useEffect(() => {
    console.log(firstLoad.current);
    if (!firstLoad) {
      setSearch("yes");
    }
    firstLoad.current = false;
  }, [state]);

  function changeValue(value: any, field: string) {
    filterActions.changeFilter(dispatch, field, value);
  }

  function changeFrom(value: any, field: string) {
    filterActions.changeFrom(dispatch, field, value, state.filter);
  }

  function changeUntil(value: any, field: string) {
    filterActions.changeUntil(dispatch, field, value, state.filter);
  }

  async function saveAsync() {
    var error = filterActions.validateFilter(state.filter);
    if (!error) {
      await filterActions.saveAsync(state.filter).then(() => {
        router.push({
          pathname: "/(tabs)/home",
          params: { search: search },
        });
      });
    } else {
      setToastConfig(error);
      setToast(true);
    }
  }

  return (
    <ViewCustom>
      <HeaderCustom
        title="Filtros"
        childrenLeft={
          <Pressable onPress={saveAsync}>
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
        <View style={[styles.row, { gap: scale(5) }]}>
          <InputAge
            title="Desde"
            age={state.filter.from.age ? state.filter.from.age.toString() : ""}
            type={state.filter.from.ageType}
            changeAge={changeFrom}
            changeAgeType={changeFrom}
          />
          <InputAge
            title="Hasta"
            age={
              state.filter.until.age ? state.filter.until.age.toString() : ""
            }
            type={state.filter.until.ageType}
            changeAge={changeUntil}
            changeAgeType={changeUntil}
          />
        </View>
        <View style={styles.submit}>
          <Button label="Guardar" onPress={saveAsync} />
        </View>

        {toast && toastConfig && (
          <Toast validation={toastConfig} setToast={setToast} />
        )}
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
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginTop: scale(16),
  },
  container: {
    flex: 1,
    marginTop: scale(16),
    gap: scale(20),
    alignItems: "center",
  },
  age: {
    marginHorizontal: scale(20),
    marginTop: scale(16),
  },
});
