# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack monorepo template ("templatesick") for building cross-platform apps with Expo, Next.js, and Convex.

## Common Commands

```sh
# Development
pnpm dev              # Start all apps (auto-syncs Convex URL to all apps)
pnpm setup            # First-time Convex setup + env sync

# Individual apps
pnpm --filter native dev           # Run Expo app (web mode)
pnpm --filter native ios           # Run on iOS (expo run:ios)
pnpm --filter native android       # Run on Android (expo run:android)
pnpm --filter web dev              # Run Next.js app
pnpm --filter @repo/backend dev    # Run Convex dev server

# Build & Deploy
pnpm build                         # Build all apps via Turborepo
pnpm --filter @repo/backend deploy # Deploy Convex to production

# Utilities
pnpm sync-env         # Manually sync CONVEX_URL from backend to all apps
pnpm format           # Format with Prettier
pnpm clean            # Remove build artifacts and node_modules
```

## Architecture

### Monorepo Structure (pnpm workspaces + Turborepo)

```
apps/
├── native/              # Expo app (iOS, Android, Web via Metro)
└── web/                 # Next.js web app
packages/
├── backend/             # Convex backend (functions, schema, auth)
├── ui/                  # Shared cross-platform UI components
└── typescript-config/   # Shared tsconfig.json files
```

### Key Technologies

- **Expo SDK 54** with React Native 0.81 and Expo Router for file-based navigation
- **Next.js 15** with React 19 for the web app
- **Tailwind CSS v4** with **NativeWind v5** for cross-platform styling
- **Convex** for real-time backend with **Convex Auth** for authentication
- **@rn-primitives** for accessible UI primitives

### Cross-Platform UI Pattern

Components in `@repo/ui` work across native and web:

```tsx
import { cn } from '../../lib/utils';

// cn() - Merges Tailwind classes (clsx + tailwind-merge)

<Pressable
  className={cn('bg-primary', className)}
/>
```

Components use `class-variance-authority` (CVA) for variant-based styling.

### Convex Backend

- Schema defined in `packages/backend/convex/schema.ts`
- Auth configured in `packages/backend/convex/auth.ts` (Password + Google OAuth)
- Native app uses `expo-secure-store` for auth tokens; web uses localStorage

### Environment Variables

- Backend: `packages/backend/.env.local` contains `CONVEX_URL` and `CONVEX_SITE_URL`
- Native: `apps/native/.env.local` contains `EXPO_PUBLIC_CONVEX_URL`
- Web: `apps/web/.env.local` contains `NEXT_PUBLIC_CONVEX_URL`
- Running `pnpm dev` or `pnpm sync-env` auto-syncs these to all apps

### Metro Configuration

The native app's Metro config is set up for monorepo support:
- Watches entire workspace for changes
- Resolves packages from source (not dist) via blocklist
- Symlinks enabled for pnpm compatibility
