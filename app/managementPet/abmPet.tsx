import { Text, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { Link } from "expo-router";

export default function ABMPet() {
  return (
    <ParallaxScrollView>
      <HeaderCustom title="Nueva mascota"></HeaderCustom>
      <Link href={"../"}>
        <Text style={styles.daleeeeAMEEEAAa}>DALE WACHAAAA QUE VUELVO!!!</Text>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  daleeeeAMEEEAAa: {
    flex: 1,
    marginTop: 400,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 26,
    textTransform: "capitalize",
  },
});
