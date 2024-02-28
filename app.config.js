module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.exceptionalalien.app",
      buildNumber: "121",
      config: {
        googleMapsApiKey: process.env.MAPS_IOS_API_KEY,
      },
    },
  };
};
