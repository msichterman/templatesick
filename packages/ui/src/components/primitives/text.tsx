import { cn } from '../../lib/utils';
import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText, type Role, type TextProps as RNTextProps } from 'react-native';

// Note: Platform-specific styles removed to fix iOS bundler issues
// Web-specific classes like 'select-text', 'scroll-m-20' are only applied on web via CSS media queries

const textVariants = cva(
  'text-foreground text-base',
  {
    variants: {
      variant: {
        default: '',
        h1: 'text-center text-4xl font-extrabold tracking-tight',
        h2: 'border-border border-b pb-2 text-3xl font-semibold tracking-tight',
        h3: 'text-2xl font-semibold tracking-tight',
        h4: 'text-xl font-semibold tracking-tight',
        p: 'mt-3 leading-7 sm:mt-6',
        blockquote: 'mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6',
        code: 'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        lead: 'text-muted-foreground text-xl',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-muted-foreground text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;

type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

export type TextProps = React.ComponentProps<typeof RNText> &
  TextVariantProps &
  React.RefAttributes<RNText> & {
    asChild?: boolean;
    className?: string;
  };

function Text({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: TextProps) {
  const textClass = React.useContext(TextClassContext);
  const combinedClassName = cn(textVariants({ variant }), textClass, className);
  const commonProps = {
    className: combinedClassName,
    role: variant ? ROLE[variant] : undefined,
    'aria-level': variant ? ARIA_LEVEL[variant] : undefined,
    ...props,
  };

  if (asChild) {
    // @ts-expect-error - React types mismatch between packages
    return <Slot.Text {...commonProps} />;
  }
  return <RNText {...commonProps} />;
}

export { Text, TextClassContext };
