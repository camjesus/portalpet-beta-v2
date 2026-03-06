import { StyleSheet, View, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { ViewCustom, HeaderCustom, Button, IconSymbol } from "@/components/ui";
import { findMyPets } from "@/features/pet/services/petService";
import { useEffect, useState } from "react";
import { PetId } from "@/models";
import Card from "@/components/myPets/Card";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";

export default function MyPets() {
  const [myPets, setMyPets] = useState<PetId[]>([]);
  const { search } = useLocalSearchParams<{
    search: string;
  }>();
  const [goTosearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false,
  );

  const getData = async (serach: boolean) => {
    await findMyPets(serach).then((res) => {
      setMyPets(res);
      setSearch(false);
    });
  };

  useEffect(() => {
    getData(goTosearch);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <ViewCustom>
        <HeaderCustom title="Mis mascotas" />
        {myPets && (
          <FlatList
            data={myPets}
            renderItem={({ item }) => <Card key={item.id} item={item} />}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={true}
            numColumns={2}
            contentContainerStyle={styles.flatList}
          />
        )}
        {!myPets && (
          <View>
            <Text style={styles.message}>Subite unas mascoteiras!</Text>
          </View>
        )}
      </ViewCustom>

      <View style={styles.float}>
        <Button circle={true}>
          <Link
            href={{
              pathname: "/managementPet",
            }}>
            <IconSymbol size={30} name="add" color="black" />
          </Link>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: scale(15),
    paddingBottom: scale(15),
    marginHorizontal: scale(20),
  },
  float: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  message: {
    marginTop: 400,
    textAlign: "center",
    color: "white",
    fontSize: 26,
  },
});
