import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import SwiperCard from "./SwiperCard";
import { PetId } from "@/models/Pet";
import { useSharedValue } from "react-native-reanimated";

type Props = {
  pets: PetId[];
  onPress?: () => void;
};

export default function Swiper({ pets, onPress }: Props) {
  const activeIndex = useSharedValue(0);

  return (
    <View style={styles.container}>
      {pets.map((item, index) => {
        return (
          <SwiperCard
            key={item.docId}
            numOfCards={pets.length}
            index={index}
            activeIndex={activeIndex}
            pet={item.pet}
          ></SwiperCard>
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
