import Constants from "expo-constants";

export const FONTS = {
  dev: {
    base: require("./dev/fonts/SpaceMono-Regular.ttf"),
  },
  prod: {
    base: require("./prod/fonts/SpaceMono-Regular.ttf"),
  },
};


const env = Constants.expoConfig?.extra.ENV || "dev";

export const base = FONTS[env].base;