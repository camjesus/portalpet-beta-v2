import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { ViewCustom, HeaderCustom, Button, IconSymbol } from "@/components/ui";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import Card from "@/components/myPets/Card";
import { useMyPets } from "@/features/pet/hooks/useMyPets";
import { EmptyState } from "@/components/myPets/EmptyState";

export default function MyPets() {
  const { myPets } = useMyPets();

  return (
    <View style={{ height: "100%" }}>
      <ViewCustom>
        <HeaderCustom title="Publicaciones" />
        {myPets.length > 0 ? (
          <FlatList
            data={myPets}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          />
        ) : (
          <EmptyState />
        )}
      </ViewCustom>

      <View style={styles.float}>
        <Button circle={true}>
          <Link href={{ pathname: "/managementPet" }}>
            <IconSymbol size={30} name="add" color="white" />
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
});
