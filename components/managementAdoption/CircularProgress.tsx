import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { scale } from "react-native-size-matters";

type Props = {
  days: number;
  totalDays: number;
};

const SIZE = scale(160);
const STROKE = scale(12);
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CircularProgress({ days, totalDays }: Props) {
  const progress = Math.min(days / totalDays, 1);

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#e0e0e0"
          strokeWidth={STROKE}
          fill="none"
        />
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#ffb13d"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.days}>{days}</Text>
        <Text style={styles.label}>de {totalDays} días</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
  days: {
    fontSize: scale(42),
    fontWeight: "bold",
    color: "#ffb13d",
  },
  label: {
    fontSize: scale(13),
    color: "#666",
  },
});