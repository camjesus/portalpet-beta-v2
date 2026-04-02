import Constants from "expo-constants";

export const FONTS = {
  dev: {
    base: require("./dev/fonts/SpaceMono-Regular.ttf"),
  },
  prod: {
    base: require("./prod/fonts/SpaceMono-Regular.ttf"),
  },
};


const env = (Constants.expoConfig?.extra?.ENV ?? "dev") as keyof typeof FONTS;
const resolvedEnv = env in FONTS ? env : "dev"; 

export const base = FONTS[resolvedEnv].base;