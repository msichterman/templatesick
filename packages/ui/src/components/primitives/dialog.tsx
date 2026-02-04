import { Icon } from './icon';
import { NativeOnlyAnimatedView } from './native-only-animated-view';
import { cn } from '../../lib/utils';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Text, View, type ViewProps, type TextProps } from 'react-native';
// Note: Reanimated imports removed due to Expo Go compatibility issues
// Animations will be disabled until a development build is used
const FadeIn = undefined;
const FadeOut = undefined;
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

// Using dialog primitive components directly - NativeWind adds className support at runtime
const { Overlay, Content, Close, Title, Description } = DialogPrimitive;

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = Close;

// FullWindowOverlay computed inside component to avoid module-scope Platform access
function getFullWindowOverlay() {
  return Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;
}

type DialogOverlayProps = Omit<DialogPrimitive.OverlayProps, 'asChild'> &
  React.RefAttributes<DialogPrimitive.OverlayRef> & {
    className?: string;
    children?: React.ReactNode;
  };

function DialogOverlay({ className, children, ...props }: DialogOverlayProps) {
  const FullWindowOverlay = getFullWindowOverlay();
  return (
    <FullWindowOverlay>
      {/* @ts-expect-error - React types mismatch between packages */}
      <Overlay
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 p-2',
          Platform.select({
            web: 'animate-in fade-in-0 fixed cursor-default [&>*]:cursor-auto',
          }),
          className
        )}
        {...props}
        asChild={Platform.OS !== 'web'}>
        <NativeOnlyAnimatedView entering={FadeIn} exiting={FadeOut}>
          <NativeOnlyAnimatedView entering={FadeIn} exiting={FadeOut}>
            <>{children}</>
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </Overlay>
    </FullWindowOverlay>
  );
}
type DialogContentProps = DialogPrimitive.ContentProps &
  React.RefAttributes<DialogPrimitive.ContentRef> & {
    className?: string;
    portalHost?: string;
  };

function DialogContent({ className, portalHost, children, ...props }: DialogContentProps) {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        {/* @ts-expect-error - React types mismatch between packages */}
        <Content
          className={cn(
            'bg-background border-border z-50 mx-auto flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg',
            Platform.select({
              web: 'animate-in fade-in-0 zoom-in-95 duration-200',
            }),
            className
          )}
          {...props}>
          <>{children}</>
          <Close
            className={cn(
              'absolute right-4 top-4 rounded opacity-70 active:opacity-100',
              Platform.select({
                web: 'ring-offset-background focus:ring-ring data-[state=open]:bg-accent transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
              })
            )}
            hitSlop={12}>
            <Icon as={X} size={16} />
            <Text className="sr-only">Close</Text>
          </Close>
        </Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

type ViewPropsWithClassName = ViewProps & { className?: string };

function DialogHeader({ className, ...props }: ViewPropsWithClassName) {
  return (
    <View className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: ViewPropsWithClassName) {
  return (
    <View
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

type DialogTitleProps = DialogPrimitive.TitleProps &
  React.RefAttributes<DialogPrimitive.TitleRef> & { className?: string };

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    // @ts-expect-error - React types mismatch between packages
    <Title
      className={cn('text-foreground text-lg font-semibold leading-none', className)}
      {...props}
    />
  );
}

type DialogDescriptionProps = DialogPrimitive.DescriptionProps &
  React.RefAttributes<DialogPrimitive.DescriptionRef> & { className?: string };

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    // @ts-expect-error - React types mismatch between packages
    <Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
