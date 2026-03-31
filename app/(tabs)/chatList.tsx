import { FlatList, StyleSheet } from "react-native";
import { HeaderCustom, ViewCustom } from "@/components/ui";
import { scale } from "react-native-size-matters";
import ChatCard from "@/components/chatList/ChatCard";
import { EmptyState } from "@/components/chatList/EmptyState";
import { useChatList } from "@/features/chat/hooks/useChatList";

export default function ChatList() {
  const { chats, user } = useChatList();

  return (
    <ViewCustom>
      <HeaderCustom title="Chats" />
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatCard userId={user?.id ?? ""} item={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={<EmptyState />}
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
