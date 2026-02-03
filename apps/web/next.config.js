/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverExternalPackages: ["uniwind"],
  transpilePackages: [
    "@repo/ui",
    "react-native",
    "react-native-web",
    "react-native-reanimated",
    "react-native-screens",
    "@rn-primitives/avatar",
    "@rn-primitives/checkbox",
    "@rn-primitives/dialog",
    "@rn-primitives/dropdown-menu",
    "@rn-primitives/label",
    "@rn-primitives/portal",
    "@rn-primitives/select",
    "@rn-primitives/slot",
    "@rn-primitives/types",
    "lucide-react-native",
  ],
  webpack: (config, { webpack, dev }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
      })
    );
    return config;
  },
};
