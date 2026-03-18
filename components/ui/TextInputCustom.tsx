import { forwardRef, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  Keyboard,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

type Props = {
  options: TextInputProps;
  editable?: boolean | true;
  multiline?: boolean;
  label?: string;
};

const TextInputCustom = forwardRef<TextInput, Props>(
  ({ options, editable, multiline, label }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const resolvedRef = (ref as React.RefObject<TextInput>) || inputRef;

    useEffect(() => {
      const sub = Keyboard.addListener("keyboardDidHide", () => {
        resolvedRef.current?.blur();
      });
      return () => sub.remove();
    }, []);

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            ref={resolvedRef}
            editable={editable}
            multiline={multiline}
            scrollEnabled={multiline}
            style={[
              styles.default,
              multiline ? styles.box : styles.input,
              editable === false && styles.disable,
            ]}
            placeholderTextColor={"#A5A5A5"}
            {...options}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  },
);
TextInputCustom.displayName = "TextInputCustom";
export default TextInputCustom;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(12),
  },
  default: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#A5A5A5",
    paddingStart: scale(10),
    textAlignVertical: "top",
  },
  input: {
    height: scale(35),
  },
  box: {
    height: scale(80),
    width: "100%",
    minHeight: 80,
    maxHeight: 120,
  },
  label: {
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    marginBottom: scale(5),
  },
  disable: {
    color: "#A5A5A5",
  },
});
