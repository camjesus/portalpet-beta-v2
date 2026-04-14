import { FlatList, Pressable, StyleSheet } from "react-native";
import { ConfirmModal, HeaderCustom, IconSymbol, ViewCustom } from "@/components/ui";
import { scale } from "react-native-size-matters";
import ChatCard from "@/components/chatList/ChatCard";
import { EmptyState } from "@/components/chatList/EmptyState";
import { useChatList } from "@/features/chat/hooks/useChatList";
import { ChatSortModal } from "@/components/chatList/ChatSortModal";

export default function ChatList() {
  const {
    chats,
    user,
    sort,
    setSort,
    showSortModal,
    setShowSortModal,
    handleLongPress,
    showDelete,
    setShowDelete,
    handleDeleteChat,
    selectedChatId,
  } = useChatList();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Chats"
        childrenLeft={
          <Pressable onPress={() => setShowSortModal(true)}>
            <IconSymbol size={26} name="sort" color="white" />
          </Pressable>
        }
      />
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatCard
            userId={user?.id ?? ""}
            item={item}
            handleLongPress={handleLongPress}
            selectedChatId={selectedChatId}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={<EmptyState />}
      />
      <ChatSortModal
        visible={showSortModal}
        selected={sort}
        onSelect={setSort}
        onClose={() => setShowSortModal(false)}
      />
      <ConfirmModal
        visible={showDelete}
        title="¿Estás seguro de eliminar el chat?"
        description="Se eliminará el chat de forma permanente."
        confirmLabel="Sí, eliminar"
        onConfirm={() => handleDeleteChat(selectedChatId ?? "", user?.id ?? "")}
        onCancel={() => setShowDelete(false)}
        danger
      />
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: scale(10),
    justifyContent: "center",
    alignContent: "center",
    marginTop: scale(10),
  },
});