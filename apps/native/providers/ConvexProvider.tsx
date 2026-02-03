import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Platform } from "react-native";
import { ReactNode } from "react";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL!,
  { unsavedChangesWarning: false, verbose: true }
);

export function ConvexProvider({ children }: { children: ReactNode }) {
  // For web, don't pass storage - let it default to localStorage
  // For native, we'd use SecureStore
  if (Platform.OS === "web") {
    return (
      <ConvexAuthProvider client={convex}>
        {children}
      </ConvexAuthProvider>
    );
  }

  // Native storage would go here
  return (
    <ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>
  );
}
