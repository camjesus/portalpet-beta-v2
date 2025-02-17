import { View } from "react-native";
import { StyleSheet } from "react-native";
import SwiperCard from "./SwiperCard";
import { PetId } from "@/models/Pet";
import { useSharedValue } from "react-native-reanimated";

type Props = {
  pets: PetId[];
};

export default function Swiper({ pets }: Props) {
  const activeIndex = useSharedValue(0);

  return (
    <View style={styles.container}>
      {pets.map((item, index) => {
        return (
          <SwiperCard
            key={item.petId}
            numOfCards={pets.length}
            index={index}
            activeIndex={activeIndex}
            item={item}
            petId={item.petId}></SwiperCard>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
