import { View, Text, StyleSheet, Pressable, Modal, Image } from "react-native";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";
import { ViewCustom, IconSymbol, ContactActions, TextInfo } from "@/components/ui";
import { useAdoptionProgress } from "@/features/adoption/hooks/useAdoptionProgress";
import { RequestWithProfile } from "@/models";
import { CircularProgress } from "./CircularProgress";

type Props = {
  acceptedRequest: RequestWithProfile;
  onGoToChat: () => void;
  onOpenProfile: () => void;
};
const ADAPTATION_DAYS = 30;

export default function AdoptionProgress({ acceptedRequest, onGoToChat, onOpenProfile }: Props) {
  const { startDate, daysElapsed, isAdopted, isFinished, handleStart, handleCancel, date, handleFinish } = useAdoptionProgress(acceptedRequest);
  const { request, profile } = acceptedRequest;

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
        <View>
          <Text style={styles.adopterName}>{request.userName + " " + request.userLastName}</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <ContactActions onGoToChat={onGoToChat} onOpenProfile={onOpenProfile} />
      </View>
      {startDate && !isFinished ? (
      <TextInfo text={`Pregunta como está la mascota, como está comiendo, si se está adaptando bien.`} />
      ):!startDate && !isFinished &&(
        <TextInfo text={`Comienza el periodo de adaptación una vez que la mascota se encuentre en su nuevo hogar.`} />
      )}
      {isFinished && (
        <TextInfo text={`Finaliza el periodo de adaptación y confirma la adopción.`} />
      )}
      <View style={styles.container}>
        <Text style={styles.title}>Período de adaptación</Text>
        <CircularProgress days={daysElapsed} totalDays={ADAPTATION_DAYS} />

        <View style={styles.card}>
        <Text style={styles.startDate}>
          Inicio: {date}
        </Text>
        </View>
        <View style={styles.buttonContainer}>
        {!startDate && !isFinished ? (
          <Pressable style={styles.btnStart} onPress={handleStart}>
            <Text style={styles.btnText}>Empezar adaptación</Text>
          </Pressable>
        ) : startDate && !isFinished && (
          <Pressable style={styles.btnCancel} onPress={handleCancel}>
            <Text style={styles.btnText}>Cancelar adaptación</Text>
          </Pressable>
        )}
        {isFinished && (
          <Pressable style={styles.btnStart} onPress={handleFinish}>
            <Text style={styles.btnText}>Finalizar adaptación</Text>
          </Pressable>
        )}
      </View>
      </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.btnCancelAdoption} onPress={handleFinish}>
          <Text style={styles.btnText}>Cancelar adopción</Text>
        </Pressable>
      </View>
      <Modal visible={isAdopted} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>¡Mascota adoptada!</Text>
            <Text style={styles.modalText}>
              El período de adaptación finalizó exitosamente.
            </Text>
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
  btnCancelAdoption:{
    backgroundColor: "#f22e2eff",
    borderRadius: 15,
    padding: scale(16),
    alignItems: "center",
    marginHorizontal: scale(20),
    marginBottom: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  content: {
  flex: 1,
},
buttonContainer:
{
  paddingHorizontal: scale(10),
  paddingBottom: scale(20),
},
  actionsContainer: {
  paddingHorizontal: scale(20),
    paddingTop: scale(5),
    
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
  container: {
    marginHorizontal: scale(16),
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
    marginBottom: scale(8),
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
    paddingVertical: scale(5),
    alignItems: "center",
    width: "100%",
  },
  startDate: {
    fontSize: scale(13),
    color: "#888",
  },
  btnStart: {
    backgroundColor: "#ffb13d",
    borderRadius: 15,
    padding: scale(16),
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnCancel: {
    backgroundColor: "#e05252",
    borderRadius: 15,
    padding: scale(16),
    alignItems: "center",
    width: "100%",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
    
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
  adopterRow: {
  alignItems: "center",
  gap: scale(12),
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
  borderRadius: scale(24),
},
adopterInitial: {
  fontSize: scale(22),
  fontWeight: "bold",
  color: "#ffb13d",
},
adopterLabel: {
  fontSize: scale(11),
  color: "#888",
},
adopterName: {
  fontSize: scale(15),
  fontWeight: "600",
  color: "#151718",
},
});