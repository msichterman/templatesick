import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.tsx",
  },
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: [
    "react",
    "react-native",
    "react-native-reanimated",
    "react-native-screens",
    "uniwind",
    "@rn-primitives/avatar",
    "@rn-primitives/checkbox",
    "@rn-primitives/dialog",
    "@rn-primitives/dropdown-menu",
    "@rn-primitives/select",
    "@rn-primitives/slot",
    "@rn-primitives/types",
    "lucide-react-native",
  ],
  dts: true,
  ...options,
}));
