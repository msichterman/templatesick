import * as React from 'react';
import { cn } from '../../lib/utils';
import * as LabelPrimitive from '@rn-primitives/label';
import { Platform } from 'react-native';

// Cast to include className support from uniwind
const Root = LabelPrimitive.Root as React.ComponentType<LabelPrimitive.RootProps & { className?: string }>;
const LabelText = LabelPrimitive.Text as React.ComponentType<LabelPrimitive.TextProps & { className?: string }>;

type LabelProps = LabelPrimitive.TextProps & React.RefAttributes<LabelPrimitive.TextRef> & { className?: string };

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: LabelProps) {
  return (
    <Root
      className={cn(
        'flex select-none flex-row items-center gap-2',
        Platform.select({
          web: 'cursor-default leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        }),
        disabled && 'opacity-50'
      )}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <LabelText
        className={cn(
          'text-foreground text-sm font-medium',
          Platform.select({ web: 'leading-none' }),
          className
        )}
        {...props}
      />
    </Root>
  );
}

export { Label };
