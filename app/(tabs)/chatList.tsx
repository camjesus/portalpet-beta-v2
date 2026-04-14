import { FlatList, Pressable, StyleSheet } from "react-native";
import { HeaderCustom, IconSymbol, ViewCustom } from "@/components/ui";
import { scale } from "react-native-size-matters";
import ChatCard from "@/components/chatList/ChatCard";
import { EmptyState } from "@/components/chatList/EmptyState";
import { useChatList } from "@/features/chat/hooks/useChatList";
import { ChatSortModal } from "@/components/chatList/ChatSortModal";

export default function ChatList() {
  const { chats, user, sort, setSort, showSortModal, setShowSortModal } = useChatList();

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
          <ChatCard userId={user?.id ?? ""} item={item} />
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
