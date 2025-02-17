import { View } from "react-native";
import React from "react";
import { MessageId } from "@/models/Message";
import BubbleText from "./BubbleText";
import BubbleUser from "./BubbleUser";
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
      <BubbleText
        isMyMessage={isMyMessage}
        message={item.message}
        system={item.system}
      />
    </View>
  );
}
