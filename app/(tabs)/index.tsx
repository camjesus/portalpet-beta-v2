import { useEffect, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { scale } from "react-native-size-matters";
import ViewCustom from "@/components/ViewCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import PanelButtons from "@/components/ui/PanelButtons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Swiper from "@/components/Search/Swiper";
import { saveUserAsync } from "@/service/storeData/useUser";
import { findPetsAsync } from "@/service/dataBase/usePet";
import {
  cleanAllAsync,
  saveActionFilterAsync,
} from "@/service/storeData/useFilter";
import {
  filterReducer,
  initalFilter,
  ACTION,
} from "@/hooks/reducers/useFilter";
import { LABELS_ACCTION } from "@/constants/StaticData";
import { PetId } from "@/models/Pet";
import { User } from "@/models/User";
import Loading from "@/components/ui/Loading";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [myPets, setMyPets] = useState<PetId[]>([]);
  const [load, setLoad] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, initalFilter);
  const [optAction, setAction] = useState(0);
  const { search } = useLocalSearchParams<{
    search: string;
  }>();
  const [goTosearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false
  );

  const getUser = async () => {
    let user = {
      id: "4dede6e5-504c-4f46-8339-9d6280a693b0",
      name: "Martin",
      lastname: "Palermo",
      email: "boquita_palermo@gmail.com",
    };
    setUser(user);
    await saveUserAsync(user);
  };

  const getData = async () => {
    await findPetsAsync().then((res) => {
      setMyPets(res.myPets);
      setAction(res.action);
      setSearch(false);
      dispatch({
        type: ACTION.CHANGE_OBJECT,
        payload: {
          field: "filter",
          value: res.filter,
        },
      });
      setLoad(false);
    });
  };

  const saveAction = async (value: number) => {
    await saveActionFilterAsync(value);
  };

  function changeValue(value: number) {
    setAction(value);
    saveAction(value);
    getData();
  }

  useEffect(() => {
    setLoad(true);
    if (user === undefined) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [goTosearch]);

  function goToFilter() {
    router.push({
      pathname: "/filter",
      params: { stateFilter: JSON.stringify(state) },
    });
  }

  //para pruebas
  const clear = async () => {
    await cleanAllAsync();
  };

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
      {load && <Loading />}
      <View style={styles.containerCenter}>
        {!load && user && (
          <PanelButtons
            changeOption={(t) => {
              changeValue(t);
            }}
            option={optAction}
            labels={LABELS_ACCTION}
          />
        )}
        {!load && user && myPets && (
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
