/// <reference types="uniwind/types" />

declare module 'uniwind' {
  import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

  export function useResolveClassNames(classNames: string | undefined): StyleProp<ViewStyle | TextStyle | ImageStyle>;
}
