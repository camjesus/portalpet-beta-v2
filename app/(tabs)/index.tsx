import "react-native-gesture-handler";
import { Text, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { saveUser } from "@/hooks/useStoreData";
import { useEffect, useReducer, useState } from "react";
import PanelButtons from "@/components/ui/PanelButtons";
import { LABELS_ACCTION, ACCTIONS } from "@/constants/StaticData";
import { scale } from "react-native-size-matters";
import { filterReducer, initalFilter, ACTION } from "@/hooks/useFilter";
import { User } from "@/models/User";
import Swiper from "@/components/Search/Swiper";
import { PetId } from "@/models/Pet";
import { myPetAsync } from "@/service/useDataBase";

export default function Search() {
  const [optAcion, setAcion] = useState(0);
  const [state, dispatch] = useReducer(filterReducer, initalFilter);
  const [user, setUser] = useState<User>();
  const [myPets, setMyPets] = useState<PetId[]>([]);

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
    await myPetAsync().then((res) => {
      setMyPets(res.myPets);
    });
  };

  useEffect(() => {
    if (user === undefined) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      getData();
    }
  }, [user, optAcion]);

  function changeValue(value: string, field: string) {
    setAcion(parseInt(value));
    dispatch({
      type: ACTION.CHANGE_FILTER,
      payload: {
        field: field,
        value: ACCTIONS[parseInt(value)],
      },
    });
  }

  return (
    <ParallaxScrollView>
      <HeaderCustom title="Portal Pet" />
      <View style={styles.containerCenter}>
        <PanelButtons
          changeOption={(t) => changeValue(t.toString(), "action")}
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
    marginTop: scale(30),
    alignContent: "center",
  },
});
