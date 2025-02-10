import "react-native-gesture-handler";
import { Text, StyleSheet, View } from "react-native";
import ViewCustom from "@/components/ViewCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { saveUser } from "@/hooks/useStoreData";
import { cleanAllAsync } from "@/hooks/useFilterStoreData";
import { StatusBar } from "expo-status-bar";
import { getFilterAsync, saveFilterAsync } from "@/hooks/useFilterStoreData";
import { useEffect, useReducer, useState } from "react";
import PanelButtons from "@/components/ui/PanelButtons";
import { LABELS_ACCTION, ACCTIONS } from "@/constants/StaticData";
import { scale } from "react-native-size-matters";
import { filterReducer, initalFilter, ACTION } from "@/hooks/useFilterReducer";
import { User } from "@/models/User";
import Swiper from "@/components/Search/Swiper";
import { PetId } from "@/models/Pet";
import { findPetsAsync, myPetAsync } from "@/service/usePetDataBase";
import { Link, router, useLocalSearchParams } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const [user, setUser] = useState<User>();
  const [myPets, setMyPets] = useState<PetId[]>([]);
  const [load, setLoad] = useState(true);
  const { search, stateFilter } = useLocalSearchParams<{
    search: string;
    stateFilter: string;
  }>();
  console.log("stateFilter", stateFilter);
  const [state, dispatch] = useReducer(
    filterReducer,
    stateFilter === undefined ? initalFilter : JSON.parse(stateFilter)
  );
  const [goTosearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false
  );
  const [filterParam, stateFilterParam] = useState<string | undefined>(
    stateFilter
  );

  console.log("search", search);
  console.log("goTosearch", goTosearch);

  console.log("state", state);
  const [optAcion, setAcion] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

  const getUser = async () => {
    let user = {
      uid: "4dede6e5-504c-4f46-8339-9d6280a693b0",
      name: "Martin",
      lastname: "Palermo",
    };
    setUser(user);
    await saveUser(user);
  };

  const getData = async (action: number) => {
    console.log("optAcion", action);
    console.log("isFirst", isFirst);

    await findPetsAsync(action, isFirst, filterParam !== undefined).then(
      (res) => {
        setMyPets(res.myPets);
        setSearch(false);
        dispatch({
          type: ACTION.CHANGE_OBJECT,
          payload: {
            field: "filter",
            value: res.filter,
          },
        });
        setLoad(false);
      }
    );
  };

  const saveFilter = async () => {
    console.log("entro a ", state.filter);
    await saveFilterAsync(JSON.stringify(state.filter));
  };

  function changeValue(value: number, field: string) {
    console.log("value", ACCTIONS[value]);
    setAcion(value);
    dispatch({
      type: ACTION.CHANGE_FILTER,
      payload: {
        field: field,
        value: value,
      },
    });
    getData(value);
  }

  useEffect(() => {
    if (state.filter.action && isFirst) {
      console.log("state.filter.action", state.filter.action);
      setAcion(state.filter.action);
      setIsFirst(false);
    }
  }, [state.filter.action]);

  useEffect(() => {
    if (user === undefined) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    goTosearch && getData(state.filter.action);
  }, [goTosearch]);

  //useEffect(() => {
  //  !isFirst && saveFilter();
  //}, [state.filter]);

  useEffect(() => {
    if (filterParam !== undefined && goTosearch) {
      stateFilterParam(undefined);
      console.log("saveFilter que no se hace", state.filter.action);
      saveFilter();
      console.log("saveFilter que no se hace");
    }
  }, [filterParam]);

  const clear = async () => {
    await cleanAllAsync();
  };

  function goToFilter() {
    saveFilter();
    router.push({
      pathname: "/filter",
      params: { stateFilter: JSON.stringify(state) },
    });
  }

  function clearAll() {
    clear();
  }

  return (
    <ViewCustom>
      <HeaderCustom
        childrenRight={
          <Pressable onPress={goToFilter}>
            <IconSymbol size={30} name="filter" color="white" />
          </Pressable>
        }
        childrenLeft={
          <Pressable onPress={clearAll}>
            <IconSymbol size={30} name="filter" color="black" />
          </Pressable>
        }
        title="Portal Pet"
      />
      <View style={styles.containerCenter}>
        {load && (
          <SafeAreaView>
            <StatusBar style="light" />
          </SafeAreaView>
        )}
        {!load && (
          <PanelButtons
            changeOption={(t) => {
              changeValue(t, "action");
            }}
            option={optAcion}
            labels={LABELS_ACCTION}
          />
        )}
        {!load && user && (
          <View style={styles.containerSwiper}>
            <Swiper pets={myPets} />
          </View>
        )}
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    alignItems: "center",
    marginTop: scale(16),
  },
  containerSwiper: {
    marginHorizontal: scale(20),
    marginTop: scale(25),
    alignContent: "center",
  },
});
