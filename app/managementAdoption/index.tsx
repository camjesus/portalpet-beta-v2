import { FlatList, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import { ViewCustom, HeaderCustom, IconSymbol } from "@/components/ui";
import { Pressable } from "react-native";
import AdoptionRequestModal from "@/components/chat/AdoptionRequestModal";
import { AdoptionRequestCard } from "@/components/managementAdoption/AdoptionRequestCard";
import { EmptyState } from "@/components/managementAdoption/EmptyState";
import { useManagementAdoption } from "@/features/adoption/hooks/useManagementAdoption";

export default function ManagementAdoption() {
  const {
    items,
    selected,
    showModal,
    setShowModal,
    pinnedIds,
    togglePin,
    handleOpenModal,
    handleAccept,
    handleReject,
  } = useManagementAdoption();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Solicitudes"
        childrenLeft={
          <Pressable onPress={() => router.back()}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.request.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <AdoptionRequestCard
            request={item.request}
            profile={item.profile}
            pinned={pinnedIds.has(item.request.id)}
            onGoToChat={() =>
              router.push({ pathname: "/chat", params: { chatId: item.request.chatId } })
            }
            onOpenProfile={() => handleOpenModal(item)}
            onTogglePin={() => togglePin(item.request.id)}
          />
        )}
      />
      <AdoptionRequestModal
        visible={showModal}
        profile={selected?.profile ?? null}
        onClose={() => setShowModal(false)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: scale(16),
    gap: scale(12),
  },
});
