import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";

type Props = {
  title: string;
  childrenRight?: React.ReactNode;
  childrenLeft?: React.ReactNode;
  onPressRight?: () => void;
  onPressLeft?: () => void;
};

export default function HeaderCustom({
  title,
  childrenRight,
  childrenLeft,
  onPressRight,
  onPressLeft,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonLeft} onPress={onPressLeft}>
        {childrenLeft}
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.buttonRight} onPress={onPressRight}>
        {childrenRight}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#ffb13d",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
  },
  button: {
    borderWidth: 3,
    borderColor: "#ffd33d",
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 26,
    marginTop: 20,
    padding: 0,
    flex: 5,
    marginBottom: 0,
    textTransform: "capitalize",
  },
  buttonLeft: {
    width: 30,
    marginStart: 30,
    marginTop: 20,
  },
  buttonRight: {
    width: 30,
    marginEnd: 30,
    marginTop: 20,
  },
});
