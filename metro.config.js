const { getDefaultConfig: getDefaultExpoConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultExpoConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg").concat(['fbx','mtl']),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
