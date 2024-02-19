module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.awj5.exceptional-alien-app",
      buildNumber: "1",
      config: {
        googleMapsApiKey: process.env.MAPS_IOS_API_KEY,
      },
    },
  };
};
