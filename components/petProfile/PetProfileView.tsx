import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol, ViewCustom } from "@/components/ui";
import { Pet } from "@/models";

const isBigger = Dimensions.get("screen").height > 830;

type Props = {
  pet: Pet;
  image: string;
  isMy: boolean;
  goToBack: () => void;
  goToReport: () => void;
  goToChat: () => void;
};

export function PetProfileView({ pet, image, isMy, goToBack, goToReport, goToChat }: Props) {
  return (
    <ViewCustom>
      <View style={styles.header}>
        <Pressable style={styles.buttonLeft} onPress={goToBack}>
          <IconSymbol size={35} name="arrow-back" color="white" />
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Ficha</Text>
          <IconSymbol
            style={{ marginStart: scale(10) }}
            size={30}
            name="clipboard"
            color="#4B4B4B"
          />
        </View>

        <View style={styles.imageRow}>
          {pet.image && (
            <>
              <Image style={styles.image} source={{ uri: image }} />
              <View style={styles.sexIcon}>
                <IconSymbol
                  name={pet?.sex === "MALE" ? "male" : "female"}
                  size={45}
                  color="white"
                />
              </View>
            </>
          )}
        </View>

        {!isMy && (
          <Pressable style={styles.buttonRight} onPress={goToReport}>
            <IconSymbol size={35} name="bullhorn" color="white" />
          </Pressable>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.infoContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.field}>Nombre: </Text>
            <Text style={styles.value}>{pet.name}</Text>
            <View style={styles.pawSize}>
              <IconSymbol name="paw" size={25} color={pet?.size === "SMALL" ? "#ffb13d" : "#A5A5A5"} />
              <IconSymbol name="paw" size={35} color={pet?.size === "MEDIUM" ? "#ffb13d" : "#A5A5A5"} />
              <IconSymbol name="paw" size={45} color={pet?.size === "BIG" ? "#ffb13d" : "#A5A5A5"} />
            </View>
          </View>
          <Text style={styles.field}>Descripción: </Text>
          <Text style={styles.value}>{pet.description}</Text>
        </View>
      </ScrollView>

      {!isMy && (
        <Pressable
          style={({ pressed }) => [styles.contactCard, pressed && styles.contactCardPressed]}
          onPress={goToChat}>
          <IconSymbol name="chat" size={22} color="#ffb13d" />
          <View style={{ flex: 1 }}>
            <Text style={styles.contactCardTitle}>Ponete en contacto</Text>
            <Text style={styles.contactCardSubtitle}>Escribile al rescatista</Text>
          </View>
          <IconSymbol name="arrow-next" size={20} color="#A5A5A5" />
        </Pressable>
      )}
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffb13d",
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30),
    paddingBottom: scale(20),
    alignItems: "center",
  },
  buttonLeft: {
    left: 0,
    width: scale(30),
    marginStart: scale(30),
    position: "absolute",
    paddingTop: scale(60),
  },
  buttonRight: {
    right: 0,
    width: scale(30),
    marginEnd: scale(30),
    position: "absolute",
    paddingTop: scale(60),
  },
  titleRow: {
    paddingBottom: scale(15),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: scale(60),
  },
  title: {
    color: "#4B4B4B",
    fontSize: scale(25),
    fontWeight: "bold",
  },
  imageRow: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: scale(300),
    height: isBigger ? scale(300) : scale(250),
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    elevation: 10,
  },
  sexIcon: {
    flexDirection: "row",
    position: "absolute",
    marginStart: scale(15),
    bottom: scale(-5),
    gap: scale(6),
    padding: scale(3),
    borderRadius: 30,
    backgroundColor: "#ffb13d",
    borderWidth: 5,
    borderColor: "white",
  },
  infoContainer: {
    paddingBottom: scale(100),
  },
  container: {
    backgroundColor: "white",
    marginHorizontal: scale(10),
    marginTop: scale(20),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(20),
    gap: scale(5),
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
  },
  field: {
    color: "#4B4B4B",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  value: {
    color: "#4B4B4B",
    fontSize: scale(15),
  },
  pawSize: {
    position: "absolute",
    right: scale(5),
    flexDirection: "row",
    alignItems: "baseline",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: scale(20),
    marginBottom: scale(20),
    padding: scale(16),
    borderRadius: 12,
    gap: scale(12),
    borderWidth: 1,
    borderColor: "#ffb13d",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  contactCardPressed: {
    backgroundColor: "#2A2A2A",
  },
  contactCardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(14),
  },
  contactCardSubtitle: {
    color: "#A5A5A5",
    fontSize: scale(11),
    marginTop: scale(2),
  },
});
