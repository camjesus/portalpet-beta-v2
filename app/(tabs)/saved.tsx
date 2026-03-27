import { FlatList, StyleSheet } from "react-native";
import { ViewCustom, HeaderCustom } from "@/components/ui";
import { PetCard } from "@/components/search/PetCard";
import { scale } from "react-native-size-matters";
import { useSaved } from "@/features/pet/hooks/useSaved";
import { EmptyState } from "@/components/saved/EmptyState";

export default function Saved() {
  const { pets, loading } = useSaved();

  return (
    <ViewCustom>
      <HeaderCustom title="Guardados" />
      {pets.length > 0 ? (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PetCard item={item} />}
        />
      ) : (
        !loading && <EmptyState />
      )}
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    paddingBottom: scale(40),
  },
});
