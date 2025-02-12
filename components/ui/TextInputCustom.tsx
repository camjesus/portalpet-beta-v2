import { FC } from "react";
import { Text, StyleSheet, TextInput, TextInputProps } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

type Props = {
  options: TextInputProps;
  editable?: boolean;
  multiline?: boolean;
  label?: string;
};

const TextInputCustom: FC<Props> = ({
  options,
  editable,
  multiline,
  label,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          editable={editable}
          multiline={multiline}
          style={[styles.default, multiline ? styles.box : styles.input]}
          {...options}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

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
  },
  label: {
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    marginBottom: scale(5),
  },
});
