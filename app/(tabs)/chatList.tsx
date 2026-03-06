import { FlatList, StyleSheet, View } from "react-native";
import { HeaderCustom, Loading, ViewCustom } from "@/components/ui";
import { useEffect, useState } from "react";
import { ChatId, User } from "@/models";
import { scale } from "react-native-size-matters";
import ChatCard from "@/components/chatList/ChatCard";
import { getChatsAsync } from "@/service/dataBase/useChat";

export default function ChatList() {
  const [chats, setChats] = useState<ChatId[]>([]);
  const [user, setUser] = useState<User>();

  const [goTosearch, setSearch] = useState<boolean>(true);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    await getChatsAsync().then((res) => {
      setChats(res.chats);
      setUser(res.user);
      setSearch(false);
      setLoad(false);
    });
  };

  useEffect(() => {
    if (goTosearch) {
      setLoad(true);
      getData();
    }
  }, [goTosearch]);

  return (
    <ViewCustom>
      <HeaderCustom title="Chats" />
      {load && <Loading />}
      <View>
        {chats && (
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <ChatCard userId={user?.id} item={item} key={item?.id} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={true}
            numColumns={1}
            contentContainerStyle={styles.flatList}
          />
        )}
      </View>
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
