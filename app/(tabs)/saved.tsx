import { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { ViewCustom, HeaderCustom, IconSymbol } from "@/components/ui";
import { getLikedPets } from "@/services/storage/likesStorage";
import { getPetDocById } from "@/features/pet/repository/petRepository";
import { mapPetFromFirestore } from "@/features/pet/mappers/petMapper";
import { PetId } from "@/models";
import { PetCard } from "@/components/search/PetCard";
import { scale } from "react-native-size-matters";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Saved() {
  const [pets, setPets] = useState<PetId[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, []),
  );

  async function loadSaved() {
    setLoading(true);
    const ids = await getLikedPets();
    const results = await Promise.all(
      ids.map(async (id) => {
        const doc = await getPetDocById(id);
        if (!doc.exists()) return null;
        return mapPetFromFirestore(doc.id, doc.data());
      }),
    );
    setPets(results.filter(Boolean) as PetId[]);
    setLoading(false);
  }

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
        !loading && (
          <View style={styles.emptyContainer}>
            <IconSymbol name="heart-outline" size={60} color="#A5A5A5" />
            <Text style={styles.emptyTitle}>Sin guardados</Text>
            <Text style={styles.emptyText}>
              Tocá el corazón en una mascota para guardarla acá
            </Text>
          </View>
        )
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
});
