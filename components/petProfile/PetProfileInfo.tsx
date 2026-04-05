import { View, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol, DetailRow } from "@/components/ui";
import { Pet } from "@/models";
import { formatAge, formatDate, getPetName, ACTION_LABEL, SIZE_LABEL } from "./petProfileUtils";

type Props = {
  pet: Pet;
};

export function PetProfileInfo({ pet }: Props) {
  const petName = getPetName(pet.name);
  const age = formatAge(pet.age, pet.ageType);
  const date = formatDate(pet.createDate);

  return (
    <>
      {pet.description && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre {petName}</Text>
          <Text style={styles.cardText}>{pet.description}</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Detalles</Text>
        <View style={styles.detailsGrid}>
          <DetailRow label="Tamaño" value={SIZE_LABEL[pet.size] ?? pet.size} />
          {age && <DetailRow label="Edad" value={age} />}
          {date && <DetailRow label="Publicado" value={date} />}
        </View>
      </View>

      {pet.rescuer && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rescatista</Text>
          <View style={styles.rescuerRow}>
            <View style={styles.rescuerAvatar}>
              <IconSymbol name="account" size={24} color="#ffb13d" />
            </View>
            <Text style={styles.rescuerName}>
              {pet.rescuer.name} {pet.rescuer.lastName}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: scale(16),
    marginBottom: scale(12),
  },
  cardTitle: {
    color: "#ffb13d",
    fontSize: scale(16),
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: scale(10),
  },
  cardText: {
    color: "#151718",
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  detailsGrid: {
    gap: scale(10),
  },
  rescuerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  rescuerAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "rgba(255,177,61,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  rescuerName: {
    color: "#151718",
    fontSize: scale(14),
    fontWeight: "500",
  },
});
