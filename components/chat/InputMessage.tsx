import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import { TextInputCustom, IconSymbol } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  sendMessage: (message: string) => void;
};

export default function InputMessage({ sendMessage }: Props) {
  const [message, setMessage] = useState("");

  function submit() {
    sendMessage(message);
    setMessage("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInputCustom
          options={{
            maxLength: 200,
            value: message,
            onChangeText: (t) => setMessage(t),
            placeholder: "Mensaje",
            numberOfLines: message.length < 100 ? 1 : 2,
          }}
        />
      </View>
      <Pressable style={styles.button} onPress={submit}>
        <IconSymbol size={25} name="send" color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    bottom: 0,
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: scale(300),
  },
  button: {
    backgroundColor: "#ffb13d",
    padding: scale(10),
    borderRadius: 10,
  },
});
