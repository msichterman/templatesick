import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { View, Platform } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Button,
  Text,
  Label,
} from "@repo/ui";

// Form wrapper for web to fix "Password field is not contained in a form" warning
function FormWrapper({ children, onSubmit }: { children: React.ReactNode; onSubmit: () => void }) {
  if (Platform.OS === "web") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ display: "contents" }}
      >
        {children}
      </form>
    );
  }
  return <>{children}</>;
}

export function SignIn() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);

  const handlePasswordAuth = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("flow", flow);
      const result = await signIn("password", formData);
      console.log("SignIn result:", result);

      // Debug: Test localStorage directly
      try {
        localStorage.setItem("__test__", "works");
        console.log("localStorage test:", localStorage.getItem("__test__"));
        localStorage.removeItem("__test__");
      } catch (e) {
        console.error("localStorage error:", e);
      }

      // Debug: Check ALL localStorage keys after sign-in
      console.log("ALL localStorage keys after sign-in:");
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key!);
        console.log(`  ${key}:`, value?.substring(0, 80) + (value && value.length > 80 ? "..." : ""));
      }

      // Tokens should now be in localStorage
      if (result.signingIn) {
        console.log("Sign-in successful! Tokens stored. Try refreshing the page manually (Cmd+R).");
      }
    } catch (error) {
      console.error("SignIn error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    signIn("google");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {flow === "signIn" ? "Welcome back" : "Create account"}
        </CardTitle>
        <CardDescription>
          {flow === "signIn"
            ? "Sign in to your account"
            : "Enter your details to get started"}
        </CardDescription>
      </CardHeader>

      <FormWrapper onSubmit={handlePasswordAuth}>
        <CardContent className="gap-4">
          <View className="gap-2">
            <Label>Email</Label>
            <Input
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View className="gap-2">
            <Label>Password</Label>
            <Input
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete={flow === "signIn" ? "current-password" : "new-password"}
            />
          </View>

          <Button onPress={handlePasswordAuth} disabled={loading}>
            <Text className="text-primary-foreground font-semibold">
              {loading ? "Loading..." : flow === "signIn" ? "Sign In" : "Sign Up"}
            </Text>
          </Button>

          <View className="flex-row items-center gap-4">
            <View className="flex-1 h-px bg-border" />
            <Text variant="muted">or</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <Button variant="outline" onPress={handleGoogleAuth}>
            <Text className="font-semibold">Continue with Google</Text>
          </Button>
        </CardContent>
      </FormWrapper>

      <CardFooter className="justify-center">
        <Text
          variant="muted"
          className="active:underline"
          onPress={() => setFlow(f => f === "signIn" ? "signUp" : "signIn")}
        >
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </CardFooter>
    </Card>
  );
}
