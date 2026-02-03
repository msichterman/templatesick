import * as React from 'react';
import { cn } from '../../lib/utils';
import * as AvatarPrimitive from '@rn-primitives/avatar';

// Cast to any to work around @rn-primitives types not including uniwind's className prop
const Root = AvatarPrimitive.Root as React.ComponentType<AvatarPrimitive.RootProps & { className?: string }>;
const Image = AvatarPrimitive.Image as React.ComponentType<AvatarPrimitive.ImageProps & { className?: string }>;
const Fallback = AvatarPrimitive.Fallback as React.ComponentType<AvatarPrimitive.FallbackProps & { className?: string }>;

function Avatar({
  className,
  ...props
}: AvatarPrimitive.RootProps & React.RefAttributes<AvatarPrimitive.RootRef> & { className?: string }) {
  return (
    <Root
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.ImageProps & React.RefAttributes<AvatarPrimitive.ImageRef> & { className?: string }) {
  return <Image className={cn('aspect-square size-full', className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.FallbackProps & React.RefAttributes<AvatarPrimitive.FallbackRef> & { className?: string }) {
  return (
    <Fallback
      className={cn(
        'bg-muted flex size-full flex-row items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
