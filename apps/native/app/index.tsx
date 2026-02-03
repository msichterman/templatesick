import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignIn } from "../components/SignIn";
import { Text, Button } from "@repo/ui";

export default function Native() {
  const { isLoading, isAuthenticated } = useConvexAuth();

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
