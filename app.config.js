module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.exceptionalalien.app",
      buildNumber: "124",
      config: {
        googleMapsApiKey: process.env.MAPS_IOS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#2220C1",
      },
      package: "com.exceptionalalien.app",
      versionCode: 1,
      config: {
        googleMapsApiKey: process.env.MAPS_ANDROID_API_KEY,
      },
    },
  };
};
