import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Platform } from "react-native";
import { ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL!,
  { unsavedChangesWarning: false, verbose: true }
);

// Storage adapter for native using expo-secure-store
const nativeStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export function ConvexProvider({ children }: { children: ReactNode }) {
  // For web, don't pass storage - let it default to localStorage
  // For native, use SecureStore
  if (Platform.OS === "web") {
    return (
      <ConvexAuthProvider client={convex}>
        {children}
      </ConvexAuthProvider>
    );
  }

  return (
    <ConvexAuthProvider client={convex} storage={nativeStorage}>
      {children}
    </ConvexAuthProvider>
  );
}
