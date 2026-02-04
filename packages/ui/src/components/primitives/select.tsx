import { Icon } from './icon';
import { NativeOnlyAnimatedView } from './native-only-animated-view';
import { TextClassContext } from './text';
import { cn } from '../../lib/utils';
import * as SelectPrimitive from '@rn-primitives/select';
import { Check, ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, View, type ViewProps } from 'react-native';
// Note: Reanimated imports removed due to Expo Go compatibility issues
// Animations will be disabled until a development build is used
const FadeIn = undefined;
const FadeOut = undefined;
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

// Using select primitive components directly - NativeWind adds className support at runtime
const { Value, Trigger, Content: ContentComp, Viewport, Label: LabelComp, Item: ItemComp, ItemText, Separator: SeparatorComp, ScrollUpButton: ScrollUpBtn, ScrollDownButton: ScrollDownBtn } = SelectPrimitive;

type SelectValueProps = Omit<SelectPrimitive.ValueProps, 'ref'> & { className?: string };

function SelectValue({ className, ...props }: SelectValueProps) {
  const { value } = SelectPrimitive.useRootContext();
  return (
    <Value
      className={cn(
        'text-foreground line-clamp-1 flex flex-row items-center gap-2 text-sm',
        !value && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

type SelectTriggerProps = Omit<SelectPrimitive.TriggerProps, 'ref'> & {
  className?: string;
  children?: React.ReactNode;
  size?: 'default' | 'sm';
};

function SelectTrigger({ className, children, size = 'default', ...props }: SelectTriggerProps) {
  return (
    <Trigger
      className={cn(
        'border-input dark:bg-input/30 dark:active:bg-input/50 bg-background flex h-10 flex-row items-center justify-between gap-2 rounded-md border px-3 py-2 shadow-sm shadow-black/5 sm:h-9',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-input/50 w-fit whitespace-nowrap text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
        }),
        props.disabled && 'opacity-50',
        size === 'sm' && 'h-8 py-2 sm:py-1.5',
        className
      )}
      {...props}>
      <>{children}</>
      <Icon as={ChevronDown} aria-hidden={true} size={16} />
    </Trigger>
  );
}

// FullWindowOverlay computed inside component to avoid module-scope Platform access
function getFullWindowOverlay() {
  return Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;
}

type SelectContentProps = Omit<SelectPrimitive.ContentProps, 'ref'> & {
  className?: string;
  portalHost?: string;
};

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectContentProps) {
  const FullWindowOverlay = getFullWindowOverlay();
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
          <TextClassContext.Provider value="text-popover-foreground">
            <NativeOnlyAnimatedView className="z-50" entering={FadeIn} exiting={FadeOut}>
              <ContentComp
                className={cn(
                  'bg-popover border-border relative z-50 min-w-[8rem] rounded-md border shadow-md shadow-black/5',
                  Platform.select({
                    web: cn(
                      'animate-in fade-in-0 zoom-in-95 origin-(--radix-select-content-transform-origin) max-h-52 overflow-y-auto overflow-x-hidden',
                      props.side === 'bottom' && 'slide-in-from-top-2',
                      props.side === 'top' && 'slide-in-from-bottom-2'
                    ),
                    native: 'p-1',
                  }),
                  position === 'popper' &&
                    Platform.select({
                      web: cn(
                        props.side === 'bottom' && 'translate-y-1',
                        props.side === 'top' && '-translate-y-1'
                      ),
                    }),
                  className
                )}
                position={position}
                {...props}>
                <SelectScrollUpButton />
                <Viewport
                  className={cn(
                    'p-1',
                    position === 'popper' &&
                      cn(
                        'w-full',
                        Platform.select({
                          web: 'h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]',
                        })
                      )
                  )}>
                  {children}
                </Viewport>
                <SelectScrollDownButton />
              </ContentComp>
            </NativeOnlyAnimatedView>
          </TextClassContext.Provider>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

type SelectLabelProps = Omit<SelectPrimitive.LabelProps, 'ref'> & { className?: string };

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <LabelComp
      className={cn('text-muted-foreground px-2 py-2 text-xs sm:py-1.5', className)}
      {...props}
    />
  );
}

type SelectItemProps = Omit<SelectPrimitive.ItemProps, 'ref'> & { className?: string; children?: React.ReactNode };

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <ItemComp
      className={cn(
        'active:bg-accent group relative flex w-full flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-8 sm:py-1.5',
        Platform.select({
          web: 'focus:bg-accent focus:text-accent-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 cursor-default outline-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none',
        }),
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <View className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} size={16} />
        </SelectPrimitive.ItemIndicator>
      </View>
      <ItemText className="text-foreground group-active:text-accent-foreground select-none text-sm" />
    </ItemComp>
  );
}

type SelectSeparatorProps = Omit<SelectPrimitive.SeparatorProps, 'ref'> & { className?: string };

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SeparatorComp
      className={cn(
        'bg-border -mx-1 my-1 h-px',
        Platform.select({ web: 'pointer-events-none' }),
        className
      )}
      {...props}
    />
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
type SelectScrollUpButtonProps = { className?: string; children?: React.ReactNode };

function SelectScrollUpButton({ className, ...props }: SelectScrollUpButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <ScrollUpBtn
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <Icon as={ChevronUpIcon} size={16} />
    </ScrollUpBtn>
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
type SelectScrollDownButtonProps = { className?: string; children?: React.ReactNode };

function SelectScrollDownButton({ className, ...props }: SelectScrollDownButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <ScrollDownBtn
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <Icon as={ChevronDownIcon} size={16} />
    </ScrollDownBtn>
  );
}

/**
 * @platform Native only
 * Returns the children on the web
 */
function NativeSelectScrollView({ className, ...props }: React.ComponentProps<typeof ScrollView> & { className?: string }) {
  if (Platform.OS === 'web') {
    return <>{props.children}</>;
  }
  return <ScrollView className={cn('max-h-52', className)} {...props} />;
}

export {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
