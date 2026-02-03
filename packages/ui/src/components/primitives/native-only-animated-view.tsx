import * as React from 'react';
import { Platform, View, type ViewProps } from 'react-native';

// Dynamically import reanimated to avoid crashes if version is incompatible
let Animated: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Animated = require('react-native-reanimated').default;
} catch {
  // Reanimated not available or version mismatch - will fallback to regular View
}

type NativeOnlyAnimatedViewProps = ViewProps & {
  entering?: any;
  exiting?: any;
  className?: string;
  children?: React.ReactNode;
};

/**
 * This component is used to wrap animated views that should only be animated on native.
 * Falls back to a regular View if reanimated is not available.
 * @param props - The props for the animated view.
 * @returns The animated view if the platform is native and reanimated is available, otherwise the children.
 * @example
 * <NativeOnlyAnimatedView entering={FadeIn} exiting={FadeOut}>
 *   <Text>I am only animated on native</Text>
 * </NativeOnlyAnimatedView>
 */
function NativeOnlyAnimatedView({ entering, exiting, children, ...props }: NativeOnlyAnimatedViewProps) {
  if (Platform.OS === 'web') {
    return <>{children}</>;
  }

  // Fallback to regular View if reanimated is not available
  if (!Animated?.View) {
    return <View {...props}>{children}</View>;
  }

  const AnimatedView = Animated.View;
  return <AnimatedView entering={entering} exiting={exiting} {...props}>{children}</AnimatedView>;
}

export { NativeOnlyAnimatedView };
