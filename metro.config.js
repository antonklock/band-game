const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('mp3', 'wav');

// Custom transformer to log assets
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  resolveRequest: (context, moduleName, platform) => {
    // console.log('Resolving module:', moduleName);
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = defaultConfig;