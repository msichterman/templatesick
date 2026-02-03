/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
  webpack: (config) => {
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
    return config;
  },
};
