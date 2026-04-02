import { FlatList, StyleSheet, View, Pressable } from "react-native";
import {
  ViewCustom,
  HeaderCustom,
  PanelButtons,
  IconSymbol,
  Loading,
} from "@/components/ui";
import { scale } from "react-native-size-matters";
import { PetCard } from "@/components/search/PetCard";
import { LABELS_ACCTION } from "@/constants/StaticData";
import { useHome } from "@/features/pet/hooks/useHome";
import { EmptyState } from "@/components/home/EmptyState";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Home() {
  const { myPets, load, optAction, goToFilter, changeValue } = useHome();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Portal Pet"
        childrenRight={
          <Pressable onPress={goToFilter}>
            <IconSymbol size={30} name="filter" color="white" />
          </Pressable>
        }
      />

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
  containerCenter: {
    position: "absolute",
    paddingTop: scale(85),
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
