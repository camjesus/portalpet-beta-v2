import { Dispatch, FC, SetStateAction } from "react";
import { View, Text, StyleSheet, TextInput, TextInputProps } from "react-native";

//type Props = {
//  label?: string;
//  placeholder: string;
//  value: string;
//  onChangeValue: Dispatch<SetStateAction<string>>;
//};
type Props = {
  options: TextInputProps;
  editable?: boolean;
};

const TextInputCustom: FC<Props> = ({ options, editable }) => {
  return (
    <View style={[styles.containerInput]}>
      <TextInput editable={editable} style={styles.input} {...options} />
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
