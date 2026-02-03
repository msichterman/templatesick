// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");
const path = require("path");

// Find the workspace root
const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages (include pnpm's .pnpm folder)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Enable symlinks for pnpm monorepo support
config.resolver.unstable_enableSymlinks = true;

// 4. Enable package exports with react-native condition
config.resolver.unstable_enablePackageExports = true;
// Ensure react-native condition is checked before import/require
config.resolver.unstable_conditionNames = ['react-native', 'import', 'require'];

// Exclude @repo/ui dist folder from being resolved - always use source
config.resolver.blockList = [
  /packages\/ui\/dist\/.*/,
];

// Uniwind must be the outermost wrapper
module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  extraThemes: ['light', 'dark'],
});
