import Constants from "expo-constants";

export const IMAGES = {
  dev: {
    logo: require("./dev/images/house_paw.png"),
    defaultImg: require("./dev/images/defaultImg.png"),
    googleSignin: require("./dev/images/googleSignin.png"),
    loading: require("./dev/images/react-logo.png"),

},
  prod: {
    logo: require("./prod/images/house_paw.png"),
    defaultImg: require("./prod/images/defaultImg.png"),
    googleSignin: require("./prod/images/googleSignin.png"),
    loading: require("./prod/images/react-logo.png"),
},
};

const env = (Constants.expoConfig?.extra?.ENV ?? "dev") as keyof typeof IMAGES;
const resolvedEnv = env in IMAGES ? env : "dev"; 

export const logo = IMAGES[resolvedEnv].logo;
export const defaultImg = IMAGES[resolvedEnv].defaultImg;
export const googleSignin = IMAGES[resolvedEnv].googleSignin;
export const loading = IMAGES[resolvedEnv].loading;