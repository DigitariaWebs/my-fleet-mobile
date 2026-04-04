const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Enable tsconfig path aliases
config.resolver.alias = {
  "@": path.resolve(__dirname, "src"),
  "@components": path.resolve(__dirname, "src/components"),
  "@constants": path.resolve(__dirname, "src/constants"),
  "@hooks": path.resolve(__dirname, "src/hooks"),
  "@types": path.resolve(__dirname, "src/types"),
  "@utils": path.resolve(__dirname, "src/utils"),
  "@assets": path.resolve(__dirname, "src/assets"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
