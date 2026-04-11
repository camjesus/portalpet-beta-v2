import { View, Text, StyleSheet, Pressable, Modal, Image } from "react-native";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";
import { ViewCustom, IconSymbol, ContactActions, TextInfo } from "@/components/ui";
import { useAdoptionProgress } from "@/features/adoption/hooks/useAdoptionProgress";
import { RequestWithProfile } from "@/models";
import { CircularProgress } from "./CircularProgress";
import { useState } from "react";
import { ConfirmModal } from "../ui/ConfirmModal";

type Props = {
  acceptedRequest: RequestWithProfile;
  onGoToChat: () => void;
  onOpenProfile: () => void;
};
const ADAPTATION_DAYS = 30;
export default function AdoptionProgress({ acceptedRequest, onGoToChat, onOpenProfile }: Props) {
  const { startDate, daysElapsed, isAdopted, isFinished,  date, handleStart, handleCancel, handleFinish, handleCancelAdoption } = useAdoptionProgress(acceptedRequest);
  const { request } = acceptedRequest;
  const [confirmModal, setConfirmModal] = useState<"adaptation" | "adoption" | null>(null);

  return (
    <ViewCustom>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <IconSymbol size={30} name="arrow-back" color="white" />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.adopterRow}>
          <View style={styles.adopterAvatar}>
            {request.userImage ? (
              <Image source={{ uri: request.userImage }} style={styles.adopterAvatarImg} />
            ) : (
              <Text style={styles.adopterInitial}>
                {request.userName?.charAt(0).toUpperCase() ?? "?"}
              </Text>
            )}
          </View>
          <Text style={styles.adopterName}>{request.userName + " " + request.userLastName}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <ContactActions onGoToChat={onGoToChat} onOpenProfile={onOpenProfile} />
        </View>

        {!startDate && !isFinished && (
          <TextInfo text="Comienza el periodo de adaptación una vez que la mascota se encuentre en su nuevo hogar." />
        )}
        {startDate && !isFinished && (
          <TextInfo text="Pregunta como está la mascota, como está comiendo, si se está adaptando bien." />
        )}
        {isFinished && (
          <TextInfo text="El periodo de adaptación finalizó. Confirmá la adopción." />
        )}

        <View style={styles.container}>
          <Text style={styles.title}>Período de adaptación</Text>
          <CircularProgress days={daysElapsed} totalDays={ADAPTATION_DAYS} />
          <View style={styles.card}>
            <Text style={styles.startDate}>Inicio: {date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {!startDate && !isFinished && (
          <Pressable style={styles.btnStart} onPress={handleStart}>
            <Text style={styles.btnText}>Empezar adaptación</Text>
          </Pressable>
        )}
        {startDate && !isFinished && (
          <Pressable style={styles.btnCancel}onPress={() => setConfirmModal("adaptation")}>
            <Text style={styles.btnText}>Cancelar adaptación</Text>
          </Pressable>
        )}
        {isFinished && (
          <Pressable style={styles.btnStart} onPress={handleFinish}>
            <Text style={styles.btnText}>Confirmar adopción 🎉</Text>
          </Pressable>
        )}

        <Pressable style={styles.btnCancelAdoption} onPress={() => setConfirmModal("adoption")}>
          <Text style={styles.btnCancelAdoptionText}>Cancelar adopción</Text>
          <Text style={styles.btnCancelAdoptionSub}>Esto cancelará todo el proceso</Text>
        </Pressable>
      </View>

      <ConfirmModal
        visible={confirmModal === "adaptation"}
        title="¿Estás seguro de cancelar la adaptación?"
        description="Se cancelará el período de adaptación en curso."
        confirmLabel="Sí, cancelar"
        onConfirm={() => { handleCancel(); setConfirmModal(null); }}
        onCancel={() => setConfirmModal(null)}
        danger
      />

      <ConfirmModal
        visible={confirmModal === "adoption"}
        title="¿Estás seguro de cancelar la adopción?"
        description="Esto cancelará todo el proceso. La mascota volverá a estar disponible."
        confirmLabel="Sí, cancelar todo"
        onConfirm={() => { handleCancelAdoption(); setConfirmModal(null); }}
        onCancel={() => setConfirmModal(null)}
        danger
      />

      <Modal visible={isAdopted} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>¡Mascota adoptada!</Text>
            <Text style={styles.modalText}>El período de adaptación finalizó exitosamente.</Text>
            <Pressable style={styles.btnStart} onPress={() => router.back()}>
              <Text style={styles.btnText}>Volver</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: scale(55),
    left: scale(16),
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 40,
    padding: scale(6),
  },
  adopterRow: {
    alignItems: "center",
    gap: scale(8),
    paddingHorizontal: scale(16),
    paddingTop: scale(90),
    paddingBottom: scale(8),
  },
  adopterAvatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: "rgba(255,177,61,0.15)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffb13d",
  },
  adopterAvatarImg: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
  },
  adopterInitial: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: "#ffb13d",
  },
  adopterName: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#151718",
  },
  actionsContainer: {
    paddingHorizontal: scale(20),
    paddingTop: scale(5),
  },
  container: {
    marginHorizontal: scale(16),
    marginTop: scale(10),
    gap: scale(16),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 12,
  },
  title: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "#ffb13d",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: scale(15),
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    alignItems: "center",
    width: "100%",
  },
  startDate: {
    fontSize: scale(13),
    color: "#888",
  },
  buttonContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
    gap: scale(10),
  },
  btnStart: {
    backgroundColor: "#ffb13d",
    borderRadius: 15,
    padding: scale(16),
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnCancel: {
    backgroundColor: "#e05252",
    borderRadius: 15,
    padding: scale(16),
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
  },
  btnCancelAdoption: {
    borderRadius: 15,
    padding: scale(12),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c0392b",
    gap: scale(2),
  },
  btnCancelAdoptionText: {
    color: "#c0392b",
    fontWeight: "bold",
    fontSize: scale(13),
  },
  btnCancelAdoptionSub: {
    color: "#c0392b",
    fontSize: scale(11),
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: scale(24),
    alignItems: "center",
    gap: scale(12),
    width: "100%",
  },
  modalEmoji: {
    fontSize: scale(48),
  },
  modalTitle: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: "#151718",
  },
  modalText: {
    fontSize: scale(14),
    color: "#666",
    textAlign: "center",
  },
});