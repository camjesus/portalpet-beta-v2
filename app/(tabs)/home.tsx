import { FlatList, StyleSheet, View, Pressable, Image, Text } from "react-native";
import {
  ViewCustom,
  PanelButtons,
  IconSymbol,
  Loading,
} from "@/components/ui";
import { scale } from "react-native-size-matters";
import { PetCard } from "@/components/search/PetCard";
import { LABELS_ACCTION } from "@/constants/StaticData";
import { useHome } from "@/features/pet/hooks/useHome";
import { EmptyState } from "@/components/home/EmptyState";
import { logo } from "@/assets/images";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Home() {
  const { myPets, load, optAction, goToFilter, changeValue } = useHome();

  return (
    <ViewCustom>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.headerTitle}>Portal Pet</Text>
        </View>
        <Pressable onPress={goToFilter}>
          <IconSymbol size={30} name="filter" color="white" />
        </Pressable>
      </View>

      {load && <Loading />}

      {!load && myPets.length > 0 && (
        <FlatList
          data={myPets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PetCard item={item} />}
        />
      )}

      {!load && myPets.length === 0 && <EmptyState onPress={goToFilter} />}

      {!load && (
        <View style={styles.containerCenter} pointerEvents="box-none">
          <PanelButtons
            option={optAction}
            labels={LABELS_ACCTION}
            changeOption={changeValue}
          />
        </View>
      )}
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffb13d",
    paddingHorizontal: scale(20),
    paddingTop: scale(50),
    paddingBottom: scale(12),
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  headerTitle: {
    color: "white",
    fontSize: scale(22),
    fontWeight: "bold",
  },
  logo: {
    width: scale(24),
    height: scale(24),
    resizeMode: "contain",
  },
  containerCenter: {
    position: "absolute",
    paddingTop: scale(100),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  list: {
    paddingHorizontal: scale(16),
    paddingTop: scale(70),
    paddingBottom: scale(40),
  },
});
