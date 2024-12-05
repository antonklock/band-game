module.exports = ({ config }) => ({
  expo: {
    name: "band-game",
    slug: "band-game",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.klockworks.band-game",
      googleServicesFile: "./GoogleService-Info.plist"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.klockworks.bandGame"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "38c8375b-de2b-4d95-91de-29f2d096deea"
      }
    },
    owner: "klock",
    plugins: [
      [
        "@react-native-firebase/app",
        {
          ios_app_id: process.env.IOS_FIREBASE_APP_ID
        }
      ],
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static"
          }
        }
      ]
    ],
  }
});