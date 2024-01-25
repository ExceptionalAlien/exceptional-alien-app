module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      config: {
        googleMapsApiKey: process.env.MAPS_IOS_API_KEY,
      },
    },
  };
};
