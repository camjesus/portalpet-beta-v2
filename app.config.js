export default ({ config }) => ({
  ...config,

  name: "Portal Pet",
  slug: "portalpet-beta-v2",
  scheme: "portalpet",

  android: {
    ...config.android,
    package: "com.camjesus.portalpetbetav2",
  },

  extra: {
    //API_URL: process.env.API_URL,
    ENV: process.env.ENV || "dev",
    eas: {
      projectId: "f3967fa5-3be1-48ad-b2aa-f62e4242487d",
    },
    ASSET_SET: process.env.ASSET_SET,
  },
  expo: {
    sdkVersion: "54.0.0",
    extra: {
      eas: {
        projectId: "f3967fa5-3be1-48ad-b2aa-f62e4242487d",
      },
    },
    plugins: [
    ],
  },
});
