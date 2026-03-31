import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol, ViewCustom } from "@/components/ui";
import { Pet } from "@/models";
import { PetProfileHeader } from "./PetProfileHeader";
import { PetProfileInfo } from "./PetProfileInfo";

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
      <PetProfileHeader
        pet={pet}
        image={image}
        isMy={isMy}
        goToBack={goToBack}
        goToReport={goToReport}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <PetProfileInfo pet={pet} />
        <View style={{ height: scale(100) }} />
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
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    paddingBottom: scale(20),
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
