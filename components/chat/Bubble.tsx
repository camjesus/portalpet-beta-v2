import { View } from "react-native";
import React from "react";
import { MessageId } from "@/models";
import BubbleText from "./BubbleText";
import BubbleUser from "./BubbleUser";
import BubbleAdoption from "./BubbleAdoption";
type Props = {
  item: MessageId;
  userId: string;
};

export default function Bubble({ item, userId }: Props) {
  const isMyMessage = item.message?.sender?.id === userId;

  return (
    <View>
      {item.bubbleUser && (
        <BubbleUser
          name={item.message?.sender?.name}
          isMyMessage={isMyMessage}
        />
      )}
      {item.message?.type === "adoption_request" ||
      item.message?.type === "adoption_accepted" ||
      item.message?.type === "adoption_rejected" ? (
        <BubbleAdoption isMyMessage={isMyMessage} type={item.message.type} />
      ) : (
        <BubbleText
          isMyMessage={isMyMessage}
          message={item.message}
          system={item.system}
        />
      )}
    </View>
  );
}
