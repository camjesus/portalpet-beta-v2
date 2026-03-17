export default ({ config }) => ({
  ...config,

  name: "Portal Pet",
  slug: "portalpet-beta-v2",
  scheme: ["portalpet", "com.camjesus.portalpetbetav2"],

  extra: {
    ENV: process.env.ENV || "dev",
    eas: {
      projectId: "f3967fa5-3be1-48ad-b2aa-f62e4242487d",
    },
    ASSET_SET: process.env.ASSET_SET,
  },

  android: {
    ...config.android,
    package: "com.camjesus.portalpetbetav2",
    softwareKeyboardLayoutMode: "resize",
    googleServicesFile: "./google-services.json",
    config: {
      googleMaps: {
        apiKey: "AIzaSyCvts-s40UYU1XDwuB2dQ7snApslO0-rck",
      },
    },
  },

  ios: {
    ...config.ios,
    bundleIdentifier: "com.camjesus.portalpetbetav2",
    config: {
      googleMapsApiKey: "AIzaSyCvts-s40UYU1XDwuB2dQ7snApslO0-rck",
    },
  },

  plugins: [
    ...(config.plugins || []),
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Permitir que $(PRODUCT_NAME) tenga acceso a tu ubicación?",
      },
    ],
  ],
});