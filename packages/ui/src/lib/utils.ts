import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Platform, type StyleProp } from 'react-native';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts Tailwind class names to a style object that works with React Native Web.
 * On web, uses the $$css escape hatch to apply CSS classes directly.
 * On native, returns undefined (className is handled by NativeWind's Metro config).
 */
export function twStyle(...inputs: ClassValue[]): StyleProp<any> | undefined {
  if (Platform.OS !== 'web') {
    return undefined;
  }
  const className = cn(...inputs);
  if (!className) return undefined;
  // RNW's $$css escape hatch - treats remaining keys as CSS class names
  return { $$css: true, _: className } as StyleProp<any>;
}
