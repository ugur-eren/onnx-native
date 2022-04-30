/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint import/no-extraneous-dependencies: "off" */

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = async () => {
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: true,
          inlineRequires: true,
        },
      }),
    },
  };
};
