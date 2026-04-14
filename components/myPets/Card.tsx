import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { scale } from "react-native-size-matters";
import { Link } from "expo-router";
import { IconSymbol, ConfirmModal } from "../ui";
import { PetId } from "@/models";
import { useCard } from "@/features/pet/hooks/useCard";

type Props = {
  item: PetId;
  onDelete: (id: string) => void;
};

export default function Card({ item, onDelete }: Props) {
  const {
    data,
    showDelete,
    showConfirm,
    handlePress,
    handleLongPress,
    handleDeletePress,
    handleConfirmDelete,
    handleCancelDelete,
  } = useCard(item, onDelete);

  const statePet = { statePet: item };

  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress}>
      <View style={[styles.card, { borderColor: data.color }]}>
        <View>
          <View style={styles.imageContainer}> 
          <Image source={{ uri: item.pet.image }} style={styles.image} />
          <View style={styles.float}>
            <Link
              href={{
                pathname: "/managementPet/loadData",
                params: {
                  stringItem: JSON.stringify(statePet),
                  image: encodeURI(item.pet.image),
                },
              }}>
              <IconSymbol size={30} name="edit" color="white" />
            </Link>
          </View>
          <Text style={[styles.labelAcction, { backgroundColor: data.color }]}>
            {data.action}
          </Text>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.textName}>{data.name}</Text>
        </View>
      </View>

      {showDelete && (
        <Pressable style={styles.deleteOverlay} onPress={handleDeletePress}>
          <IconSymbol name="delete" size={30} color="white" />
        </Pressable>
      )}

      <ConfirmModal
        visible={showConfirm}
        title="¿Eliminar mascota?"
        description={`¿Seguro que querés eliminar a ${item.pet.name || "esta mascota"}? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        danger
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: scale(2),
    paddingHorizontal: scale(8),
  },
  deleteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: scale(150),
    height: scale(250),
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  float: {
    right: 10,
    top: 10,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.32)",
    borderRadius: 20,
    padding: scale(6),
  },
  card: {
    borderRadius: 20,
    borderWidth: scale(2),
    width: scale(150),
    height: scale(250),
    alignItems: "center",
    alignContent: "center",
    marginRight: scale(10),
    marginBottom: scale(10),
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
    imageContainer: {
      width: scale(150) - scale(4),
      height: scale(200),
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      overflow: "hidden",
    },
    image: {
      width: scale(150) - scale(4),
      height: scale(190),
    },
  textName: {
    color: "black",
    textAlign: "center",
    fontSize: scale(15),
    marginHorizontal: scale(10),
  },
  labelAcction: {
    position: "absolute",
    bottom: scale(3),
    left: scale(8),
    paddingVertical: scale(3),
    paddingHorizontal: scale(8),
    color: "white",
    fontWeight: "bold",
    fontSize: scale(11),
    borderRadius: 6,
  },
});