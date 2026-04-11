import { StyleSheet, View, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { ViewCustom, HeaderCustom, Button, IconSymbol } from "@/components/ui";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import Card from "@/components/myPets/Card";
import { useMyPets } from "@/features/pet/hooks/useMyPets";
import { EmptyState } from "@/components/myPets/EmptyState";
import { FilterTabs } from "@/components/myPets/FilterTabs";

export default function MyPets() {
  const { filteredPets, filter, setFilter , handleDelete} = useMyPets();

  return (
    <View style={{ height: "100%" }}>
      <ViewCustom>
        <HeaderCustom title="Publicaciones" />
        <FlatList
          data={filteredPets}
          renderItem={({ item }) => <Card item={item} onDelete={() => handleDelete(item.id)} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ListEmptyComponent={<EmptyState />}
        />
      </ViewCustom>
      <View style={styles.filterRow}>
        <FilterTabs 
          selected={filter}
          onSelect={setFilter}
        />
      </View>
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
    paddingTop: scale(60),
    paddingBottom: scale(15),
    marginHorizontal: scale(20),
  },
  float: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
filterRow: {
  position: "absolute",
  paddingTop: scale(70),
  left: scale(20),
  right: scale(20),
},
});