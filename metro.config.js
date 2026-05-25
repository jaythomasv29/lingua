const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs"];

// Zustand v5 ESM builds use `import.meta` which Hermes doesn't support.
// Redirect zustand imports to their CJS equivalents before Metro resolves
// them through the package.json exports map (which points to the ESM builds).
const nativewindConfig = withNativewind(config, { input: "./global.css" });

const existingResolveRequest = nativewindConfig.resolver.resolveRequest;

nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand" || moduleName === "zustand/middleware") {
    const file = moduleName === "zustand" ? "index" : "middleware";
    return {
      filePath: path.resolve(__dirname, `node_modules/zustand/${file}.js`),
      type: "sourceFile",
    };
  }
  if (existingResolveRequest) {
    return existingResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = nativewindConfig;
