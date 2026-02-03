import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { View } from "react-native";
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
      await signIn("password", formData);
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
          <Text variant="h3">
            {flow === "signIn" ? "Welcome back" : "Create account"}
          </Text>
        </CardTitle>
        <CardDescription>
          <Text variant="muted">
            {flow === "signIn"
              ? "Sign in to your account"
              : "Enter your details to get started"}
          </Text>
        </CardDescription>
      </CardHeader>

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
