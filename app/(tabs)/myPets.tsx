import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Link } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import Button from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { myPetAsync } from "@/service/useDataBase";
import { useEffect, useState } from "react";
import { Pet } from "@/models/Pet";
import Card from "@/components/MyPets/Card";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";

interface PetId {
  docId: string;
  pet: Pet;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 20) / 2;

export default function MyPets() {
  const [myPets, setMyPets] = useState<PetId[]>([]);

  const getData = async () => {
    await myPetAsync("4dede6e5-504c-4f46-8339-9d6280a693b0").then((res) => {
      setMyPets(res);
    });
  };

  useEffect(() => {
    getData();
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
      </ParallaxScrollView>

      <View style={styles.float}>
        <Button circle={true}>
          <Link href={"/managementPet"}>
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
});
