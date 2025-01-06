import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

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
            <View style={[{ paddingHorizontal: 10 }]}>

{children}
</View>

          </View>
  );
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
      },
      checkBoxContainer: {
        backgroundColor: "white",
        paddingBottom: 10,
        borderRadius: 10,
      },
      titleBackground: {
        backgroundColor: "#ffb13d",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 5,
        marginBottom: 5,
      },
      title: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
      },
});
