"use client";

import { View, StyleSheet } from "react-native";
import { Text, Button } from "@repo/ui";

export default function Web() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6 bg-background">
      {/* Test: Native HTML with Tailwind */}
      <h1 className="text-4xl font-bold text-foreground">Web App</h1>
      <p className="text-muted-foreground max-w-md text-center">
        Testing Tailwind CSS v4 with React Native Web. HTML elements styled with Tailwind work correctly.
      </p>

      {/* Card using native HTML with Tailwind */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-md w-full">
        <h3 className="text-lg font-semibold text-foreground mb-2">Welcome</h3>
        <p className="text-muted-foreground text-sm mb-4">
          This card is built with HTML elements and Tailwind classes.
        </p>
        <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          Tailwind Badge
        </span>
      </div>

      {/* RNW View with StyleSheet (works) */}
      <View style={styles.rnwCard}>
        <Text>React Native Web View (styled with StyleSheet)</Text>
      </View>

      <div className="flex flex-row gap-2">
        {/* HTML buttons with Tailwind */}
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-sm hover:bg-primary/90 transition-colors"
          onClick={() => alert("HTML Primary clicked!")}
        >
          HTML Primary
        </button>
        <button
          className="border border-border bg-transparent text-foreground px-4 py-2 rounded-md shadow-sm hover:bg-accent/50 transition-colors"
          onClick={() => alert("HTML Outline clicked!")}
        >
          HTML Outline
        </button>
      </div>

      {/* UI Package Button (may not have Tailwind styles) */}
      <div className="flex flex-row gap-2">
        <Button onPress={() => alert("RN Button clicked!")}>
          <Text>RN Button</Text>
        </Button>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  rnwCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    maxWidth: 400,
    width: "100%",
  },
});
