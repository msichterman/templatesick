import * as React from 'react';
import { TextClassContext } from './text';
import { cn, twStyle } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';

// Note: Platform-specific styles removed to fix iOS bundler issues
// Web-specific hover/focus styles will need to be handled via CSS media queries

const buttonVariants = cva(
  'group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-primary active:bg-primary/90 shadow-sm shadow-black/5',
        destructive: 'bg-destructive active:bg-destructive/90 dark:bg-destructive/60 shadow-sm shadow-black/5',
        outline: 'border-border bg-background active:bg-accent dark:bg-input/30 dark:border-input dark:active:bg-input/50 border shadow-sm shadow-black/5',
        secondary: 'bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5',
        ghost: 'active:bg-accent dark:active:bg-accent/50',
        link: '',
      },
      size: {
        default: 'h-10 px-4 py-2 sm:h-9',
        sm: 'h-9 gap-1.5 rounded-md px-3 sm:h-8',
        lg: 'h-11 rounded-md px-6 sm:h-10',
        icon: 'h-10 w-10 sm:h-9 sm:w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'text-foreground text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & { className?: string };

function Button({ className, variant, size, style, ...props }: ButtonProps) {
  const buttonClasses = cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className);
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={buttonClasses}
        style={StyleSheet.flatten([twStyle(buttonClasses), style])}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
