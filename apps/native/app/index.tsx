import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignIn } from "../components/SignIn";
import { Text, Button } from "@repo/ui";

export default function Native() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  // Debug logging
  console.log("Auth state:", { isLoading, isAuthenticated });

  // Debug: Show all localStorage keys on mount
  if (typeof window !== "undefined") {
    console.log("=== PAGE LOAD DEBUG ===");
    console.log("localStorage.length:", localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key!);
      console.log(`  ${key}: ${value?.substring(0, 50)}...`);
    }
    // Check for the specific keys we expect
    const jwtKey = "__convexAuthJWT_httpsavidpanda171convexcloud";
    const jwt = localStorage.getItem(jwtKey);
    console.log(`JWT token present: ${!!jwt}`);
    console.log("=== END DEBUG ===");
  }

  return (
    <View className="flex-1 bg-background items-center justify-center p-4">
      <AuthLoading>
        <Text variant="muted">Loading...</Text>
      </AuthLoading>

      <Unauthenticated>
        <SignIn />
      </Unauthenticated>

      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>

      <StatusBar style="auto" />
    </View>
  );
}

function AuthenticatedContent() {
  const { signOut } = useAuthActions();

  return (
    <View className="items-center gap-6">
      <Text variant="h1">Welcome!</Text>
      <Text variant="muted" className="text-center">
        You are now signed in to the app.
      </Text>
      <Button variant="destructive" onPress={() => signOut()}>
        <Text className="text-white font-semibold">Sign Out</Text>
      </Button>
    </View>
  );
}
