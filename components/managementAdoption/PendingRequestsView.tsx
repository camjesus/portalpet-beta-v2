import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import { AdoptionRequestCard } from "@/components/managementAdoption/AdoptionRequestCard";
import { EmptyState } from "@/components/managementAdoption/EmptyState";
import { HeaderCustom, IconSymbol, TextInfo } from "../ui";

type Props = {
  items: any[];
  pinnedIds: Set<string>;
  togglePin: (id: string) => void;
  handleOpenModal: (item: any) => void;
};

export function PendingRequestsView({ items, pinnedIds, togglePin, handleOpenModal }: Props) {
  return (
    <>
      <HeaderCustom
        title="Solicitudes"
        childrenLeft={
          <Pressable onPress={() => router.back()}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Pressable>
        }
      />
      <TextInfo text={`Aceptá o rechazá solicitudes.\nSi aceptás una, las demás se cancelan.`} />
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
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: scale(16), gap: scale(12) },
});