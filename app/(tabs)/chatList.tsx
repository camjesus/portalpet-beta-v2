import { StyleSheet } from "react-native";
import ViewCustom from "@/components/ViewCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";

export default function ChatList() {
  return (
    <ViewCustom>
      <HeaderCustom title="Chats" />
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    flexWrap: "wrap",
  },
});
