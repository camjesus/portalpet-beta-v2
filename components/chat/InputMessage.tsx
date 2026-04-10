import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import { TextInputCustom, IconSymbol } from "@/components/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  sendMessage: (message: string) => void;
};

export default function InputMessage({ sendMessage }: Props) {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");

  function submit() {
    sendMessage(message);
    setMessage("");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.input, { marginBottom: insets.bottom || scale(15) }]}>
        <TextInputCustom
          options={{
            maxLength: 200,
            value: message,
            onChangeText: (t) => setMessage(t),
            placeholder: "Escribe un mensaje...",
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
    marginTop: 10,
    marginHorizontal: scale(5),
    alignItems: "baseline"
  },
  input: {
    flex:1,
  },
  button: {
    backgroundColor: "#ffb13d",
    padding: scale(10),
    borderRadius: 40,
  },
});
