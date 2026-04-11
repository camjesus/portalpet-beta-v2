import { router, useLocalSearchParams } from "expo-router";
import { ViewCustom, HeaderCustom, IconSymbol, Loading, FinishedView } from "@/components/ui";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import { ContactChatCard } from "@/components/ui/ContactChatCard";
import { EmptyContacts } from "@/components/ui/EmptyContacts";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useManagementContacts } from "@/features/chat/hooks/useManagementContacts";
import { useAuthStore } from "@/store/authStore";
import React from "react";

export default function ManagementFound() {
  const { chats, loading, showConfirm, setShowConfirm, buttonLabel, handleFinalize, isFinished } = useManagementContacts();
  const userId = useAuthStore((s) => s.user?.id ?? "");

  if (loading) return <Loading />;

  return (
    <ViewCustom>
      {isFinished ? (
      <FinishedView
        title="¡Misión cumplida! 🎉"
        description="Gracias por tomarte el tiempo de ayudar, de verdad hace la diferencia. Personas como vos suman un montón. ¡Gracias por confiar en Portal Pet!"
      />
      ) : (
        <>
      <HeaderCustom
        title="Contactos"
        childrenLeft={
          <Pressable onPress={() => router.back()}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
        <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactChatCard item={item} currentUserId={userId} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyContacts
            title="Nadie reclamó esta mascota"
            description="Cuando el dueño o alguien que lo conozca se contacte, aparecerá aquí."
          />
        }
      />

      <View style={styles.footer}>
        <Pressable style={styles.btn} onPress={() => setShowConfirm(true)}>
          <IconSymbol name="check" size={18} color="white" />
          <Text style={styles.btnText}>{buttonLabel}</Text>
        </Pressable>
      </View>
        </>
      )}

    <ConfirmModal
      visible={showConfirm}
      title="🎉 ¡Misión cumplida!"
      description="Gracias por ayudar a reunir a esta mascota con su dueño. Por mas gente como vos! Gracias por usar Portal Pet."
      confirmLabel="Confirmo!"
      onConfirm={() => { handleFinalize(); setShowConfirm(false); }}
      onCancel={() => setShowConfirm(false)}
    />
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  finished: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  finishedTitle: {
    fontSize: scale(24),
    fontWeight: "bold",
    color: "#ffb13d",
    textAlign: "center",
    marginBottom: scale(10),
  },
  finishedDescription: {
    fontSize: scale(16),
    color: "#666",
    textAlign: "center",
    marginBottom: scale(20),
  },
  list: {
    paddingTop: scale(10),
    paddingBottom: scale(100),
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
    paddingTop: scale(10),
  },
  btn: {
    backgroundColor: "#ffb13d",
    borderRadius: 15,
    padding: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
  },
});