import * as React from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { useResolveClassNames } from 'uniwind';

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
};

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * This component allows you to render any Lucide icon while applying utility classes
 * using Uniwind. It uses `useResolveClassNames` to convert className to style.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@repo/ui';
 *
 * <Icon as={ArrowRight} className="text-red-500" size={16} />
 * ```
 *
 * @param {LucideIcon} as - The Lucide icon component to render.
 * @param {string} className - Utility classes to style the icon using Uniwind.
 * @param {number} size - Icon size (defaults to 14).
 * @param {...LucideProps} ...props - Additional Lucide icon props passed to the "as" icon.
 */
function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  const resolvedStyles = useResolveClassNames(cn('text-foreground', className));

  return (
    <IconComponent
      size={size}
      style={resolvedStyles}
      {...props}
    />
  );
}

export { Icon };
