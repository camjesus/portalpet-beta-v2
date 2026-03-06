import { useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { scale } from "react-native-size-matters";
import {
  ViewCustom,
  HeaderCustom,
  PanelButtons,
  IconSymbol,
  Loading,
} from "@/components/ui";
import Swiper from "@/components/search/Swiper";
import { findPets } from "@/features/pet/services/petService";
import { saveActionFilterAsync } from "@/services/storage/filterStorage";
import {
  filterReducer,
  initalFilter,
  ACTION,
} from "@/hooks/reducers/useFilter";
import { LABELS_ACCTION } from "@/constants/StaticData";
import { PetId } from "@/models";

export default function Prueba() {
  const [myPets, setMyPets] = useState<PetId[]>([]);
  const [load, setLoad] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, initalFilter);
  const [optAction, setAction] = useState(0);
  const { search } = useLocalSearchParams<{
    search: string;
  }>();
  const [goTosearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false,
  );
  const navigation = useNavigation();

  useEffect(() => {
    console.log("entro a hone");
    return () => {
      navigation.setOptions({ tabBarStyle: undefined }); // Restaurar Tabs al salir
    };
  }, [navigation]);

  const getData = async () => {
    console.log("goTosearch");
    console.log(goTosearch);
    await findPets().then((res) => {
      //console.log("res.myPets", res.myPets);
      console.log("busco las mascotas otra vee");
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
    getData();
  }, [goTosearch]);

  function goToFilter() {
    router.push({
      pathname: "/filter",
      params: { stateFilter: JSON.stringify(state) },
    });
  }

  return (
    <ViewCustom>
      <HeaderCustom
        childrenRight={
          <Pressable onPress={goToFilter}>
            <IconSymbol size={30} name="filter" color="white" />
          </Pressable>
        }
        title="Portal Pet"
      />
      {load && <Loading />}
      <View style={styles.containerCenter}>
        {!load && (
          <PanelButtons
            changeOption={(t) => {
              changeValue(t);
            }}
            option={optAction}
            labels={LABELS_ACCTION}
          />
        )}
        {!load && myPets && (
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
