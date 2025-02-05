import { StyleSheet, View, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import Button from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { myPetAsync } from "@/service/useDataBase";
import { useEffect, useState } from "react";
import { PetId } from "@/models/Pet";
import Card from "@/components/MyPets/Card";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import { User } from "@/models/User";

export default function MyPets() {
  const [myPets, setMyPets] = useState<PetId[]>([]);
  const [user, setUser] = useState<User>();
  const { search } = useLocalSearchParams<{
    search: string;
  }>();
  const [goTosearch, setSearch] = useState<boolean>(
    search === "yes" || search === undefined ? true : false
  );
  console.log("VOLVIII", search);

  const getData = async () => {
    await myPetAsync().then((res) => {
      setMyPets(res.myPets);
      setUser(res.user);
      setSearch(false);
    });
  };

  useEffect(() => {
    if (goTosearch) {
      console.log("goTosearch");
      getData();
    }
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <ParallaxScrollView>
        <HeaderCustom title="Mis mascotas"></HeaderCustom>
        {myPets && (
          <FlatList
            data={myPets}
            renderItem={({ item }) => <Card pet={item.pet} />}
            keyExtractor={(item) => item.docId}
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
      </ParallaxScrollView>

      <View style={styles.float}>
        <Button circle={true}>
          <Link
            href={{
              pathname: "/managementPet",
              params: {
                uid: user && user.uid,
                name: user && user.name,
                lastname: user && user.lastname,
              },
            }}
          >
            <IconSymbol size={25} name="add" color="black" />
          </Link>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: scale(20),
    justifyContent: "center",
    alignContent: "center",

    marginTop: scale(15),
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
    color: "#FFFFFF",
    fontSize: 26,
  },
});
