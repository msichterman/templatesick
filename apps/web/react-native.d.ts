// Type augmentation for React Native components to include className from uniwind/react-native-web
// This is needed because the web app uses Next.js + PostCSS instead of Metro with withUniwindConfig
import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
}

declare module 'react-native-reanimated' {
  namespace Animated {
    interface AnimatedProps {
      className?: string;
    }
  }
}
