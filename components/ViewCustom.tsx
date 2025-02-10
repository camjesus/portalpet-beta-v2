import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{}>;

export default function ViewCustom({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151718",
  },
});
