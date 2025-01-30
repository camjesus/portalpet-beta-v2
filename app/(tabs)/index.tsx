import "react-native-gesture-handler";
import { Text, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import {
  cleanAllAsync,
  getFilterAsync,
  saveFilterAsync,
  saveUser,
} from "@/hooks/useStoreData";
import { useEffect, useReducer, useState } from "react";
import PanelButtons from "@/components/ui/PanelButtons";
import { LABELS_ACCTION, ACCTIONS } from "@/constants/StaticData";
import { scale } from "react-native-size-matters";
import { filterReducer, initalFilter, ACTION } from "@/hooks/useFilterReducer";
import { User } from "@/models/User";
import Swiper from "@/components/Search/Swiper";
import { PetId } from "@/models/Pet";
import { findPetsAsync, myPetAsync } from "@/service/useDataBase";
import { Link, router, useLocalSearchParams } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";

export default function Search() {
  const [user, setUser] = useState<User>();
  const [myPets, setMyPets] = useState<PetId[]>([]);
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

  const getData = async () => {
    await findPetsAsync(state.filter).then((res) => {
      setMyPets(res.myPets);
      setSearch(false);
    });
  };

  const getFilter = async () => {
    await getFilterAsync().then((state) => {
      console.log("PEPE state", state);
      if (state) {
        dispatch({
          type: ACTION.CHANGE_OBJECT,
          payload: {
            field: "object",
            value: state.filter,
          },
        });
      } else {
        getData();
      }
    });
  };

  const saveFilter = async () => {
    let filter = JSON.parse(stateFilter);
    await saveFilterAsync(filter);
  };

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
    if (stateFilter === undefined) {
      getFilter();
    }
  }, []);

  useEffect(() => {
    if (stateFilter) {
      saveFilter();
    }
    if (goTosearch) {
      getData();
    }
  }, [optAcion, goTosearch]);

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
    saveFilter();
    getData();
  }
  const clear = async () => {
    await cleanAllAsync();
  };

  function goToFilter() {
    router.push({
      pathname: "/filter",
      params: { stateFilter: JSON.stringify(state) },
    });
  }

  function clearAll() {
    clear();
  }

  return (
    <ParallaxScrollView>
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
        <PanelButtons
          changeOption={(t) => {
            changeValue(t, "action");
          }}
          option={optAcion}
          labels={LABELS_ACCTION}
        />
      </View>
      {user && (
        <View style={styles.containerSwiper}>
          <Swiper pets={myPets} />
        </View>
      )}
    </ParallaxScrollView>
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
