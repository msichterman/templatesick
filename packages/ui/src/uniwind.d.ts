/// <reference types="uniwind/types" />

declare module 'uniwind' {
  import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

  export function useResolveClassNames(classNames: string | undefined): StyleProp<ViewStyle | TextStyle | ImageStyle>;
}

// Augment react-native components to accept className prop (added by uniwind at runtime)
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
}
