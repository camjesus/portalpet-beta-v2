import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function TitleCustom({ title, children }: Props) {
  return (
    <View style={[styles.column, styles.checkBoxContainer]}>
      <View style={styles.titleBackground}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[{ paddingHorizontal: scale(8) }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  checkBoxContainer: {
    backgroundColor: "white",
    paddingBottom: scale(5),
    borderRadius: 10,
  },
  titleBackground: {
    backgroundColor: "#ffb13d",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: scale(5),
    marginBottom: scale(5),
  },
  title: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
  },
});
