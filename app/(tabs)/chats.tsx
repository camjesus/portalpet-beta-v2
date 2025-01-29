import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TextInputCustom from "@/components/ui/TextInputCustom";
import PanelButtons from "@/components/ui/PanelButtons";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { useState } from "react";
import { Link } from "expo-router";

export default function TabThreeScreen() {
  return (
    <ParallaxScrollView>
      <HeaderCustom
        title="Portal Pet"
        childrenRight={
          <Link href={"/managementPet"}>
            <IconSymbol size={30} name="paw" color="white" />
          </Link>
        }
        childrenLeft={<IconSymbol size={30} name="paw" color="white" />}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: "auto",
    flexWrap: "wrap",
  },
});
