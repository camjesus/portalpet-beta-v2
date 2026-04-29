import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Polygon,
} from "react-native-svg";

// ─── Colores ─────────────────────────────────────────────────────────────────
const COLORS = {
  dogBody: "#1a1a1a",
  dogBodyLight: "#f0f0f0",
  dogBodyMid: "#2a2a2a",
  dogToe: "#d0d0d0",
  dogNose: "#D4537E",
  dogEye: "#fff",
  dogPupil: "#1a1a1a",
  dogIris: "#3a2010",
  catBody: "#EF9F27",
  catBodyLight: "#FAC775",
  catNose: "#D4537E",
  catEye: "#412402",
  catPupil: "#26215C",
  catWhisker: "#633806",
  heart: "#D4537E",
};

// ─── Dog SVG (negro, orejas caídas, lengua fija, patitas blancas) ─────────────
const DogSvg = () => (
  <Svg width={88} height={100} viewBox="0 0 110 114">
    {/* sombra */}
    <Ellipse cx={55} cy={108} rx={22} ry={5} fill={COLORS.dogBody} opacity={0.10} />

    {/* CUERPO */}
    <Ellipse cx={55} cy={78} rx={26} ry={20} fill={COLORS.dogBody} />
    {/* panza blanca */}
    <Ellipse cx={55} cy={81} rx={14} ry={13} fill={COLORS.dogBodyLight} />

    {/* PATAS TRASERAS */}
    <Ellipse cx={36} cy={92} rx={8} ry={6} fill={COLORS.dogBody} />
    <Ellipse cx={74} cy={92} rx={8} ry={6} fill={COLORS.dogBody} />
    <Ellipse cx={36} cy={97} rx={7} ry={4} fill={COLORS.dogBodyLight} />
    <Ellipse cx={74} cy={97} rx={7} ry={4} fill={COLORS.dogBodyLight} />
    <Ellipse cx={31} cy={99} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={36} cy={100} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={41} cy={99} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={69} cy={99} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={74} cy={100} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={79} cy={99} rx={2} ry={1.5} fill={COLORS.dogToe} />

    {/* COLA */}
    <Path d="M78 74 Q94 62 90 48" stroke={COLORS.dogBody} strokeWidth={6} strokeLinecap="round" fill="none" />
    <Circle cx={90} cy={48} r={5} fill={COLORS.dogBodyLight} />

    {/* CUELLO */}
    <Ellipse cx={55} cy={60} rx={14} ry={8} fill={COLORS.dogBody} />

    {/* CABEZA */}
    <Circle cx={55} cy={38} r={24} fill={COLORS.dogBody} />

    {/* OREJAS CAÍDAS */}
    <Path d="M32 28 Q20 30 18 46 Q17 58 30 60 Q36 56 36 46 Q36 34 32 28Z" fill="#111" />
    <Path d="M78 28 Q90 30 92 46 Q93 58 80 60 Q74 56 74 46 Q74 34 78 28Z" fill="#111" />
    <Path d="M32 30 Q22 32 20 46 Q19 56 30 58 Q34 55 34 46 Q34 35 32 30Z" fill={COLORS.dogBodyMid} />
    <Path d="M78 30 Q88 32 90 46 Q91 56 80 58 Q76 55 76 46 Q76 35 78 30Z" fill={COLORS.dogBodyMid} />

    {/* OJOS */}
    <Circle cx={46} cy={34} r={6} fill={COLORS.dogEye} />
    <Circle cx={64} cy={34} r={6} fill={COLORS.dogEye} />
    <Circle cx={47} cy={34} r={4} fill={COLORS.dogPupil} />
    <Circle cx={65} cy={34} r={4} fill={COLORS.dogPupil} />
    <Circle cx={49} cy={32} r={1.5} fill="white" />
    <Circle cx={67} cy={32} r={1.5} fill="white" />
    <Circle cx={47} cy={35} r={2} fill={COLORS.dogIris} />
    <Circle cx={65} cy={35} r={2} fill={COLORS.dogIris} />

    {/* MEJILLAS */}
    <Ellipse cx={35} cy={44} rx={5} ry={3.5} fill={COLORS.dogBodyMid} />
    <Ellipse cx={75} cy={44} rx={5} ry={3.5} fill={COLORS.dogBodyMid} />

    {/* HOCICO */}
    <Ellipse cx={55} cy={45} rx={10} ry={7} fill={COLORS.dogBodyMid} />
    <Ellipse cx={55} cy={44} rx={7} ry={5} fill="#333" />
    {/* nariz */}
    <Ellipse cx={55} cy={41} rx={5} ry={3.5} fill="#111" />
    <Ellipse cx={54} cy={40} rx={2} ry={1.2} fill="#3a3a3a" opacity={0.6} />
    {/* boca */}
    <Path d="M50 47 Q55 51 60 47" stroke="#111" strokeWidth={1.5} fill="none" strokeLinecap="round" />

    {/* LENGUA fija */}
    <Ellipse cx={55} cy={52} rx={4} ry={5} fill={COLORS.dogNose} />
    <Ellipse cx={55} cy={55} rx={4} ry={2.2} fill="#c04070" />

    {/* PATAS DELANTERAS */}
    <Ellipse cx={39} cy={84} rx={8} ry={10} fill={COLORS.dogBody} />
    <Ellipse cx={71} cy={84} rx={8} ry={10} fill={COLORS.dogBody} />
    <Ellipse cx={39} cy={93} rx={7.5} ry={5} fill={COLORS.dogBodyLight} />
    <Ellipse cx={71} cy={93} rx={7.5} ry={5} fill={COLORS.dogBodyLight} />
    <Ellipse cx={34} cy={95} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={39} cy={96} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={44} cy={95} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={66} cy={95} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={71} cy={96} rx={2} ry={1.5} fill={COLORS.dogToe} />
    <Ellipse cx={76} cy={95} rx={2} ry={1.5} fill={COLORS.dogToe} />
  </Svg>
);

// ─── Cat SVG ─────────────────────────────────────────────────────────────────
const CatSvg = () => (
  <Svg width={66} height={80} viewBox="0 0 66 80">
    <Ellipse cx={33} cy={76} rx={16} ry={4} fill={COLORS.catBody} opacity={0.12} />
    <Ellipse cx={33} cy={57} rx={16} ry={14} fill={COLORS.catBody} />
    <Ellipse cx={33} cy={57} rx={11} ry={9} fill={COLORS.catBodyLight} />
    <Ellipse cx={22} cy={67} rx={5} ry={4} fill={COLORS.catBody} />
    <Ellipse cx={44} cy={67} rx={5} ry={4} fill={COLORS.catBody} />
    <Ellipse cx={22} cy={68} rx={3.5} ry={2.5} fill={COLORS.catBodyLight} />
    <Ellipse cx={44} cy={68} rx={3.5} ry={2.5} fill={COLORS.catBodyLight} />
    <Path d="M50 56 Q62 44 58 32 Q56 24 50 26" stroke={COLORS.catBody} strokeWidth={4} strokeLinecap="round" fill="none" />
    <Circle cx={33} cy={31} r={17} fill={COLORS.catBody} />
    <Polygon points="18,22 22,8 30,20" fill={COLORS.catBody} />
    <Polygon points="48,22 44,8 36,20" fill={COLORS.catBody} />
    <Polygon points="20,21 23,11 29,20" fill={COLORS.catBodyLight} />
    <Polygon points="46,21 43,11 37,20" fill={COLORS.catBodyLight} />
    <Ellipse cx={27} cy={30} rx={4} ry={3} fill={COLORS.catEye} />
    <Ellipse cx={39} cy={30} rx={4} ry={3} fill={COLORS.catEye} />
    <Ellipse cx={27} cy={30} rx={1.8} ry={2.5} fill={COLORS.catPupil} />
    <Ellipse cx={39} cy={30} rx={1.8} ry={2.5} fill={COLORS.catPupil} />
    <Circle cx={28} cy={29} r={0.9} fill="white" />
    <Circle cx={40} cy={29} r={0.9} fill="white" />
    <Polygon points="33,35 30,38 36,38" fill={COLORS.catNose} />
    <Line x1={12} y1={36} x2={26} y2={37} stroke={COLORS.catWhisker} strokeWidth={1} opacity={0.5} />
    <Line x1={12} y1={39} x2={26} y2={39} stroke={COLORS.catWhisker} strokeWidth={1} opacity={0.5} />
    <Line x1={40} y1={37} x2={54} y2={36} stroke={COLORS.catWhisker} strokeWidth={1} opacity={0.5} />
    <Line x1={40} y1={39} x2={54} y2={39} stroke={COLORS.catWhisker} strokeWidth={1} opacity={0.5} />
  </Svg>
);

// ─── Heart SVG ────────────────────────────────────────────────────────────────
const HeartSvg = () => (
  <Svg width={18} height={16} viewBox="0 0 18 16">
    <Path
      d="M9 14 C9 14 1 9 1 4.5 A3.5 3.5 0 0 1 9 3.5 A3.5 3.5 0 0 1 17 4.5 C17 9 9 14 9 14Z"
      fill={COLORS.heart}
    />
  </Svg>
);

// ─── Paw SVGs ─────────────────────────────────────────────────────────────────
const DogPawSvg = ({ color }: { color: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Ellipse cx={12} cy={15} rx={6} ry={5} fill={color} />
    <Circle cx={7} cy={9} r={2.5} fill={color} />
    <Circle cx={12} cy={7} r={2.5} fill={color} />
    <Circle cx={17} cy={9} r={2.5} fill={color} />
  </Svg>
);

const CatPawSvg = ({ color }: { color: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Ellipse cx={12} cy={15} rx={5} ry={4.5} fill={color} />
    <Circle cx={7} cy={10} r={2} fill={color} />
    <Circle cx={12} cy={8} r={2} fill={color} />
    <Circle cx={17} cy={10} r={2} fill={color} />
  </Svg>
);

// ─── Paw sequence: alternando perro / gato ───────────────────────────────────
const PAW_SEQUENCE = [
  { Component: DogPawSvg, color: COLORS.dogBody },
  { Component: CatPawSvg, color: COLORS.catBody },
  { Component: DogPawSvg, color: "#888" },
  { Component: CatPawSvg, color: COLORS.catBodyLight },
];

// ─── Main Component ───────────────────────────────────────────────────────────
interface PetLoaderProps {
  label?: string;
  sublabel?: string;
}

export default function PetLoader({
  label = "El portal de las mascotas",
  sublabel = "PortalPet",
}: PetLoaderProps) {
  const dogY = useRef(new Animated.Value(0)).current;
  const catY = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartY = useRef(new Animated.Value(0)).current;
  const heartOp = useRef(new Animated.Value(0)).current;
  const pawAnims = useRef(PAW_SEQUENCE.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Dog bounce
    Animated.loop(
      Animated.sequence([
        Animated.timing(dogY, { toValue: -11, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(dogY, { toValue: 0, duration: 500, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    ).start();

    // Cat bounce (springy)
    Animated.loop(
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(catY, { toValue: -14, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(catY, { toValue: -5, duration: 200, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        Animated.timing(catY, { toValue: 0, duration: 300, easing: Easing.bounce, useNativeDriver: true }),
        Animated.delay(500),
      ])
    ).start();

    // Heart pop loop
    const heartLoop = () => {
      heartScale.setValue(0);
      heartY.setValue(0);
      heartOp.setValue(0);
      Animated.sequence([
        Animated.delay(800),
        Animated.parallel([
          Animated.timing(heartOp, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(heartScale, { toValue: 1.2, duration: 300, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
          Animated.timing(heartY, { toValue: -6, duration: 300, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(heartY, { toValue: -16, duration: 600, useNativeDriver: true }),
          Animated.timing(heartOp, { toValue: 0, duration: 600, useNativeDriver: true }),
          Animated.timing(heartScale, { toValue: 0.7, duration: 600, useNativeDriver: true }),
        ]),
      ]).start(() => setTimeout(heartLoop, 300));
    };
    heartLoop();

    // Dots
    const dotPulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.2, duration: 600, useNativeDriver: true }),
          Animated.delay(400),
        ])
      ).start();

    // Paw sequence
    const pawLoop = () => {
      const seq = pawAnims.map((anim, i) =>
        Animated.sequence([
          Animated.delay(i * 280),
          Animated.timing(anim, { toValue: 1, duration: 320, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
          Animated.delay(550),
          Animated.timing(anim, { toValue: 0, duration: 380, useNativeDriver: true }),
        ])
      );
      Animated.stagger(0, seq).start(() => setTimeout(pawLoop, 150));
    };
    pawLoop();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.animalsRow}>
        <Animated.View
          style={[styles.heart, { opacity: heartOp, transform: [{ scale: heartScale }, { translateY: heartY }] }]}
        >
          <HeartSvg />
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: dogY }] }}>
          <DogSvg />
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: catY }] }}>
          <CatSvg />
        </Animated.View>
      </View>

      <View style={styles.pawRow}>
        {pawAnims.map((anim, i) => {
          const { Component, color } = PAW_SEQUENCE[i];
          return (
            <Animated.View
              key={i}
              style={{
                opacity: anim,
                transform: [
                  { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) },
                  { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ["-8deg", "0deg"] }) },
                ],
              }}
            >
              <Component color={color} />
            </Animated.View>
          );
        })}
      </View>

      <Text style={styles.label}>{label}</Text>
      <Text style={styles.sub}>{sublabel}</Text>

    </View>
  );
}

// ─── Screen wrapper ───────────────────────────────────────────────────────────
export function PetLoaderScreen() {
  return (
    <View style={styles.screen}>
      <PetLoader />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  animalsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 28,
    marginBottom: 24,
    position: "relative",
  },
  heart: {
    position: "absolute",
    top: -4,
    left: "50%",
    marginLeft: -9,
    zIndex: 10,
  },
  pawRow: {
    flexDirection: "row",
    gap: 9,
    height: 22,
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
    color: "#2C2C2A",
    marginBottom: 4,
    textAlign: "center",
  },
  sub: {
    fontSize: 13,
    color: "#888780",
    marginBottom: 20,
    textAlign: "center",
  },
  dotRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
