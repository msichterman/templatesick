"use client";

import { View, StyleSheet } from "react-native";
import { Text, Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@repo/ui";

export default function Web() {
  return (
    <View style={styles.container}>
      <Text variant="h1">Web App</Text>

      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent style={styles.cardContent}>
          <Text>This app uses the shared @repo/ui package with React Native Web.</Text>
          <Badge variant="secondary">
            <Text>Shared Components</Text>
          </Badge>
        </CardContent>
      </Card>

      <View style={styles.buttonRow}>
        <Button onPress={() => alert("Primary clicked!")}>
          <Text>Primary</Text>
        </Button>
        <Button variant="outline" onPress={() => alert("Outline clicked!")}>
          <Text>Outline</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: 400,
  },
  cardContent: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
});
