import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";
import { AdoptionProfile } from "@/models";

type Props = {
  visible: boolean;
  profile: AdoptionProfile | null;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
};

export default function AdoptionRequestModal({
  visible,
  profile,
  onClose,
  onAccept,
  onReject,
}: Props) {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <IconSymbol name="paw" size={24} color="#ffb13d" />
            <Text style={styles.title}>Solicitud de adopción</Text>
            <Pressable onPress={onClose}>
              <IconSymbol name="close" size={24} color="#A5A5A5" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {profile ? (
              <View style={styles.content}>
                <InfoRow label="Nombre" value={profile.fullName} />
                <InfoRow label="Dirección" value={profile.address} />
                <InfoRow
                  label="Tipo de vivienda"
                  value={
                    profile.housingType === "house" ? "Casa" : "Departamento"
                  }
                />
                <InfoRow
                  label="¿Tiene patio?"
                  value={profile.hasYard ? "Sí" : "No"}
                />
                <InfoRow
                  label="Horas sola"
                  value={`${profile.hoursAlone} horas`}
                />
                <InfoRow
                  label="¿Tiene otras mascotas?"
                  value={profile.hasOtherPets ? "Sí" : "No"}
                />
                {profile.hasOtherPets && (
                  <InfoRow
                    label="¿Cuáles?"
                    value={profile.otherPetsDescription}
                  />
                )}
                <InfoRow
                  label="¿Tuvo mascotas antes?"
                  value={profile.hadPetsBefore ? "Sí" : "No"}
                />
                {profile.hadPetsBefore && (
                  <InfoRow
                    label="¿Qué pasó?"
                    value={profile.previousPetsDescription}
                  />
                )}
              </View>
            ) : (
              <Text style={styles.noProfile}>No se encontró el perfil</Text>
            )}
          </ScrollView>

          <View style={styles.buttons}>
            <Pressable
              style={({ pressed }) => [
                styles.rejectButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={onReject}>
              <Text style={styles.rejectText}>Rechazar</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.acceptButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={onAccept}>
              <Text style={styles.acceptText}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: scale(20),
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#ffb13d",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(16),
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(16),
    flex: 1,
    textAlign: "center",
  },
  content: {
    gap: scale(12),
    paddingBottom: scale(16),
  },
  infoRow: {
    backgroundColor: "#151718",
    padding: scale(12),
    borderRadius: 10,
    gap: scale(4),
  },
  infoLabel: {
    color: "#A5A5A5",
    fontSize: scale(11),
  },
  infoValue: {
    color: "white",
    fontSize: scale(13),
    fontWeight: "bold",
  },
  noProfile: {
    color: "#A5A5A5",
    textAlign: "center",
    padding: scale(20),
  },
  buttons: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: scale(16),
  },
  rejectButton: {
    flex: 1,
    padding: scale(14),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E57373",
    alignItems: "center",
  },
  rejectText: {
    color: "#E57373",
    fontWeight: "bold",
    fontSize: scale(14),
  },
  acceptButton: {
    flex: 1,
    padding: scale(14),
    borderRadius: 12,
    backgroundColor: "#ffb13d",
    alignItems: "center",
  },
  acceptText: {
    color: "#151718",
    fontWeight: "bold",
    fontSize: scale(14),
  },
});
