import '../global.css';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from "expo-router";
import { ConvexProvider } from "../providers/ConvexProvider";

export default function AppLayout() {
  return (
    <ConvexProvider>
      <Stack />
      <PortalHost />
    </ConvexProvider>
  );
}
