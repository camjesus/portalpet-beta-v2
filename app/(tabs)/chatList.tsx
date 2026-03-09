import { FlatList, StyleSheet, View } from "react-native";
import { HeaderCustom, Loading, ViewCustom } from "@/components/ui";
import { useCallback, useEffect, useState } from "react";
import { ChatId, User } from "@/models";
import { scale } from "react-native-size-matters";
import ChatCard from "@/components/chatList/ChatCard";
import { getChatsAsync } from "@/features/chat/services/chatService";

export default function ChatList() {
  const [chats, setChats] = useState<ChatId[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    getChatsAsync((chats) => {
      setChats(chats); // se llama cada vez que hay cambios
    }).then((res) => {
      setUser(res?.user);
      unsub = res?.unsub;
    });

    return () => unsub?.();
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
