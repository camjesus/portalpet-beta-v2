import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { loadAction } from "@/service/utils/usePet";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";
import { ChatId } from "@/models/Chat";
import { IconSymbol } from "../ui/IconSymbol";
import { formatURL } from "@/service/utils/useUtil";

type Props = {
  item: ChatId;
  userId: string | undefined | null;
};

export default function Card({ item, userId }: Props) {
  const [data, setData] = useState({ action: "", color: "" });
  const image =
    item?.chat?.pet?.image !== null && item?.chat?.pet?.image !== undefined
      ? item?.chat?.pet?.image
      : "";

  useEffect(() => {
    var [action, color] = loadAction(
      item?.chat.pet?.action !== null && item?.chat.pet?.action !== undefined
        ? item?.chat.pet?.action
        : ""
    );
    setData({ action: action, color: color });
  }, []);

  function goToPetProfile() {
    router.push({
      pathname: "/chat",
      params: {
        chatId: item.id,
      },
    });
  }

  return (
    <Pressable onPress={goToPetProfile}>
      <View
        style={[styles.card, { borderColor: data.color, overflow: "hidden" }]}>
        <View style={styles.viewImage}>
          <Image source={{ uri: formatURL(image) }} style={[styles.image]} />
        </View>
        <View style={styles.viewDesc}>
          <View style={styles.viewName}>
            <IconSymbol name="paw" size={30} color="white" />
            <Text style={styles.textName}>{item?.chat.pet?.name}</Text>
          </View>
          <View style={styles.viewName}>
            <IconSymbol name="account" size={30} color="white" />
            <Text style={styles.textName}>
              {userId === item?.chat.rescuer?.id
                ? item?.chat.user?.name
                : item?.chat.rescuer?.name}
            </Text>
          </View>
        </View>

        <View style={styles.viewAction}>
          <Text style={[styles.labelAcction, { backgroundColor: data.color }]}>
            {data.action}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: scale(3),
    width: "100%",
    height: scale(100),
    marginRight: scale(10),
    marginBottom: scale(10),
    flexDirection: "row",
    alignContent: "center",
  },
  image: {
    width: scale(100),
    height: scale(100),
    resizeMode: "cover",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  textName: {
    color: "white",
    fontSize: scale(15),
    marginStart: scale(5),
  },
  labelAcction: {
    padding: scale(5),
    paddingHorizontal: scale(10),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: scale(12),
    borderRadius: 5,
  },
  viewAction: {
    alignItems: "flex-end",
    position: "absolute",
    right: scale(5),
    bottom: scale(5),
  },
  viewImage: {
    alignContent: "center",
    justifyContent: "center",
    marginRight: scale(5),
  },
  viewName: {
    flexDirection: "row",
    marginTop: scale(5),
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  viewDesc: {
    marginStart: scale(5),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    marginVertical: "auto",
  },
});
