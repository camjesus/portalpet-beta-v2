import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import HeaderCustom from "@/components/ui/HeaderCustom";
import Button from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function MyPets() {
  return (
    <View style={{ height: "100%" }}>
      <ParallaxScrollView>
        <HeaderCustom title="Mis Mascotas"></HeaderCustom>
        <Text style={{ color: "white" }}>La lista loca de mascotas</Text>
      </ParallaxScrollView>
      <View style={styles.float}>
        <Button circle={true}>
          <Link href={"/managementPet"}>
            <IconSymbol size={25} name="add" color="black" />
          </Link>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  float: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
});
