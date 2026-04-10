import { View, Text, StyleSheet, Image} from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol, DetailRow } from "@/components/ui";
import { Pet, Rescuer } from "@/models";
import { formatAge, formatDate, getPetName, ACTION_LABEL, SIZE_LABEL } from "./petProfileUtils";

type Props = {
  pet: Pet;
  rescuer: Rescuer;
};

export function PetProfileInfo({ pet, rescuer }: Props) {
  const petName = getPetName(pet.name);
  const age = formatAge(pet.age, pet.ageType);
  const date = formatDate(pet.createDate);
  const initials = `${rescuer.name.charAt(0)}${rescuer.lastName.charAt(0)}`.toUpperCase();
  const fullName = [rescuer.name, rescuer.lastName].filter(Boolean).join(" ");
  const bio = rescuer.bio ? rescuer.bio : "Sin presentación";

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
            {rescuer.image ? 
            <Image source={{ uri: rescuer.image }} style={styles.rescuerAvatar} /> 
            : <View style={styles.rescuerAvatar}>
              {initials ? (
                <Text style={styles.initials}>{initials}</Text>
              ) : (
                <IconSymbol name="account" size={40} color="#ffb13d" />
              )}
            </View>}
            <Text style={styles.rescuerName}>
              {fullName}
            </Text>
           
          </View>
          <Text style={styles.rescuerBio}>
            {bio}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  initials: {
    color: "#ffb13d",
    fontSize: scale(26),
    fontWeight: "bold",
  },
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
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  rescuerName: {
    color: "#151718",
    fontSize: scale(14),
    fontWeight: "500",
  },
  rescuerBio: {
    color: "#4b4b4bff",
    fontSize: scale(14),
    marginLeft: scale(52),
  },
});
