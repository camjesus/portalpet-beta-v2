import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  title?: string;
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
      {title !== undefined && <Text style={styles.titleS}>{title}</Text>}
      <Pressable style={styles.buttonRight} onPress={onPressRight}>
        {childrenRight}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(10),
    paddingTop: scale(10),
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
    padding: scale(10),
  },
  titleS: {
    fontSize: scale(30),
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: scale(15),
    padding: 0,
    flex: 5,
    marginBottom: 0,
    //textTransform: "capitalize",
  },
  buttonLeft: {
    width: scale(30),
    marginStart: scale(30),
    marginTop: scale(20),
  },
  buttonRight: {
    width: scale(30),
    marginEnd: scale(30),
    marginTop: scale(20),
  },
});
