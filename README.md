# templatesick

A full-stack monorepo template for building cross-platform apps with **Expo**, **Next.js**, and **Convex**.

## Tech Stack

- **[Turborepo](https://turbo.build/repo)** - Monorepo build system with caching
- **[Expo SDK 54](https://expo.dev/)** - React Native framework for iOS, Android, and web
- **[Next.js 15](https://nextjs.org/)** - React framework for the web app
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[NativeWind v5](https://www.nativewind.dev/)** - Tailwind CSS for React Native (pre-release for Tailwind v4 support)
- **[React Native Reusables](https://rnr-docs.vercel.app/)** - Accessible UI components via `@rn-primitives/*`
- **[Convex](https://convex.dev/)** - Real-time backend with automatic sync
- **[Convex Auth](https://labs.convex.dev/auth)** - Authentication for Convex

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (`npm install -g pnpm`)
- A [Convex](https://convex.dev/) account

### Setup

1. **Use this template** - Click "Use this template" on GitHub to create your repo

2. **Install dependencies**
   ```sh
   pnpm install
   ```

3. **Set up Convex** (creates project and syncs env to native app)
   ```sh
   pnpm setup
   ```
   This will prompt you to create a new Convex project and automatically sync the `EXPO_PUBLIC_CONVEX_URL` to the native app.

4. **Start development**
   ```sh
   pnpm dev
   ```

> **Note:** If you need to re-sync environment variables after running `convex dev` manually, run `pnpm sync-env`.

## Project Structure

```
├── apps/
│   ├── native/          # Expo app (iOS, Android, Web)
│   └── web/             # Next.js web app
├── packages/
│   ├── backend/         # Convex backend (functions, schema, auth)
│   ├── ui/              # Shared UI components
│   └── typescript-config/  # Shared TypeScript configs
```

### Apps

| App | Description | Tech |
|-----|-------------|------|
| `native` | Mobile & web app | Expo 54, React Native 0.81, Expo Router |
| `web` | Web app | Next.js 15, React 19, react-native-web |

### Packages

| Package | Description |
|---------|-------------|
| `@repo/backend` | Convex functions, schema, and auth configuration |
| `@repo/ui` | Shared UI components using rn-primitives, CVA, and Tailwind |
| `@repo/typescript-config` | Shared `tsconfig.json` configurations |

## Scripts

```sh
pnpm setup      # Set up Convex and sync env vars to native app
pnpm dev        # Start all apps in development mode
pnpm build      # Build all apps
pnpm sync-env   # Sync Convex URL from backend to native app
pnpm clean      # Clean build artifacts and node_modules
pnpm format     # Format code with Prettier
```

## UI Components

The `@repo/ui` package includes accessible components built on [rn-primitives](https://rn-primitives.vercel.app/):

- Avatar, Checkbox, Dialog, Dropdown Menu, Label, Select
- Styled with Tailwind via `class-variance-authority`
- Icons from `lucide-react-native`

## License

MIT
