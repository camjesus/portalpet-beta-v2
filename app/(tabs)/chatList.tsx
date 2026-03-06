import { FlatList, StyleSheet, View } from "react-native";
import { HeaderCustom, Loading, ViewCustom } from "@/components/ui";
import { useEffect, useState } from "react";
import { ChatId, User } from "@/models";
import { scale } from "react-native-size-matters";
import ChatCard from "@/components/chatList/ChatCard";
import { getChatsAsync } from "@/features/chat/services/chatService";

export default function ChatList() {
  const [chats, setChats] = useState<ChatId[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [load, setLoad] = useState(false);

  const loadChats = async () => {
    try {
      setLoad(true);

      const res = await getChatsAsync();

      setChats(res.chats);
      setUser(res.user);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <ViewCustom>
      <HeaderCustom title="Chats" />

      {load && <Loading />}

      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatCard userId={user?.id ?? ""} item={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
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
