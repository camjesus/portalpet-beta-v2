import { useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Pressable, BackHandler, Text } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { scale } from "react-native-size-matters";
import {
  ViewCustom,
  HeaderCustom,
  PanelButtons,
  IconSymbol,
  Loading,
  Button,
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

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

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
    navigation.setOptions({
      gestureEnabled: false,
      headerBackVisible: false,
    });

    // Bloquear el botón físico de back en Android
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true, // retornar true bloquea el back
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    return () => {
      navigation.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);

  const getData = async () => {
    await findPets().then((res) => {
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
        {!load && myPets.length > 0 && (
          <View style={styles.containerSwiper}>
            <Swiper pets={myPets} />
          </View>
        )}
        {!load && myPets.length === 0 && (
          <View style={styles.emptyContainer}>
            <IconSymbol name="paw" size={60} color="#A5A5A5" />
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptyText}>
              No encontramos mascotas con los filtros seleccionados
            </Text>
            <Button label="Modificar filtros" onPress={goToFilter} />
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
  emptyContainer: {
    alignItems: "center",
    marginTop: scale(60),
    gap: scale(12),
    paddingHorizontal: scale(30),
  },
  emptyTitle: {
    color: "white",
    fontSize: scale(20),
    fontWeight: "bold",
  },
  emptyText: {
    color: "#A5A5A5",
    fontSize: scale(13),
    textAlign: "center",
    lineHeight: scale(20),
  },
  emptyButton: {
    marginTop: scale(8),
    backgroundColor: "#ffb13d",
    paddingHorizontal: scale(24),
    paddingVertical: scale(10),
    borderRadius: 20,
  },
  emptyButtonText: {
    color: "#151718",
    fontWeight: "bold",
    fontSize: scale(13),
  },
});
